const express = require('express');
const User = require('../mongodb/models/User'); // 请确保路径正确
const router = express.Router();

// 创建新用户
router.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body); // 从请求体中获取用户数据
        const _id = await newUser.save(); // 保存用户并获取_id
        res.status(201).json({ message: 'User created successfully', _id: _id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create user', error: error.toString() });
    }
});

// 根据ID查询用户
router.get('/users/:_id', async (req, res) => {
    try {
        const user = await User.findById(req.params._id); // 从URL参数中获取_id并查询用户
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve user', error: error.toString() });
    }
});

// 更新用户信息
router.patch('/users/:_id', async (req, res) => {
    try {
        const updateResult = await User.update(req.params._id, req.body); // 获取_id和要更新的数据
        if (updateResult.modifiedCount === 0) {
            return res.status(404).json({ message: 'No user found to update' });
        }
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update user', error: error.toString() });
    }
});

// 删除用户
router.delete('/users/:_id', async (req, res) => {
    try {
        const deleteResult = await User.deleteById(req.params._id); // 获取_id并执行删除操作
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: 'No user found to delete' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete user', error: error.toString() });
    }
});

module.exports = router;
