const supabase = require('../models/supabase');

// GET /tasks
exports.getAllTasks = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        res.status(500).json({ error: 'Internal Server Error, failed to fetch tasks' });
    }
};

// GET /tasks/:id
exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching task:', error.message);
        res.status(500).json({ error: 'Internal Server Error, failed to fetch task' });
    }
};

// GET /tasks/project/:project_id
exports.getTasksByProject = async (req, res) => {
    const { project_id } = req.params;
    try {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('project_id', project_id)
            .order('created_at', { ascending: false });
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching tasks by project:', error.message);
        res.status(500).json({ error: 'Internal Server Error, failed to fetch tasks by project' });
    }
};

// POST /tasks
exports.createTask = async (req, res) => {
    const { project_id, title, description, status, priority, deadline } = req.body;
    if (!title || !description || !project_id) {
        return res.status(400).json({ error: 'Name, description, and project_id are required' });
    }

    try {
        const { data, error } = await supabase
            .from('tasks')
            .insert([{ project_id, title, description, status, priority, deadline }])
            .select()
            .single();
        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        console.error('Error creating task:', error.message);
        res.status(500).json({ error: 'Internal Server Error, failed to create task' });
    }
};

// PUT /tasks/:id
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const {project_id, title, description, status, priority, deadline} = req.body;

    if (!title || !description || !project_id) {
        return res.status(400).json({ error: 'Title, description, and project_id are required' });
    }

    try {
        const { data, error } = await supabase
            .from('tasks')
            .update({project_id, title, description, status, priority, deadline})
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json(data);
    } catch (error) {
        console.error('Error updating task:', error.message);
        res.status(500).json({ error: 'Internal Server Error, failed to update task' });
    }
};

// DELETE /tasks/:id
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error.message);
        res.status(500).json({ error: 'Internal Server Error, failed to delete task' });
    }
};