import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';
import { Post } from './entity/post';
import { Comment } from './entity/comment';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', async (req: Request, res: Response) => {
    const users = await getManager().getRepository(User).find({ relations: ['posts'] });
    console.log(users);
    res.json(users);
});

app.get('/posts', async (req: Request, res: Response) => {
    const posts = await getManager().getRepository(Post).find({ relations: ['comments'] });
    res.json(posts);
});

app.get('/posts/:userId', async (req, res) => {
    const userPosts = await getManager().getRepository(Post)
        .createQueryBuilder('post')
        .where('post.userId = :id', { id: Number(req.params.userId) })
        .getMany();
    res.json(userPosts);
});

app.get('/comments/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;
    const comments = await getManager().getRepository(Comment)
        .createQueryBuilder('comment')
        .leftJoinAndSelect('comment.user', 'user')
        .leftJoinAndSelect('comment.post', 'post')
        .where('comment.authorId = :userId', { userId: Number(userId) })
        // .leftJoinAndSelect('user.comment', 'comment')
        .getMany();
    console.log(comments);
    res.json(comments);
});

app.post('/users', async (req, res) => {
    const createdUser = await getManager().getRepository(User).save(req.body);
    console.log(req.body);
    res.json(createdUser);
});

app.post('/posts', async (req, res) => {
    const createdPost = await getManager().getRepository(Post).save(req.body);
    res.json(createdPost);
});

app.post('/comments', async (req, res) => {
    const createdComment = await getManager().getRepository(Comment).save(req.body);
    res.json(createdComment);
});

app.post('/comments/action', async (req, res) => {
    const { commentId, action } = req.body;
    const comment = await getManager().getRepository(Comment)
        .createQueryBuilder('comment')
        .where('comment.id = :commentId', { commentId })
        .getOne();

    if (!comment) {
        throw new Error('No comment');
    }

    if (action === 'like') {
        await getManager().getRepository(Comment)
            .update({ id: commentId }, { like: comment.like + 1 });
    }

    if (action === 'dislike') {
        await getManager().getRepository(Comment)
            .update({ id: commentId }, { dislike: comment.dislike + 1 });
    }
    res.json(comment);
});

app.patch('/users/:id', async (req, res) => {
    const { email, password } = req.body;
    const updatedUser = await getManager()
        .getRepository(User)
        .update({ id: Number(req.params.id) }, {
            email,
            password,
        });
    res.json(updatedUser);
});

app.patch('/posts/:id', async (req, res) => {
    const { text } = req.body;
    const updatedUser = await getManager().getRepository(Post)
        .update({ id: Number(req.params.id) }, {
            text,
        });
    res.json(updatedUser);
});

app.delete('/users/:id', async (req, res) => {
    const deletedUser = await getManager()
        .getRepository(User)
        .softDelete({ id: Number(req.params.id) });
    res.json(deletedUser);
});

app.listen(5500, async () => {
    console.log('Server has started!!!');
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
