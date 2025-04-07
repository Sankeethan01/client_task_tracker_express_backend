const supabase = require('../models/supabase');

// GET /projects
exports.getAllProjects = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching projects:', error.message);
        res.status(500).json({ error: 'Internal Server Error, failed to fetch projects' });
    }
};

// GET /projects/:id
exports.getProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Project not found' });
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching project:', error.message);
        res.status(500).json({ error: 'Internal Server Error, failed to fetch project' });
    }
};

// GET /projects/client/:client_id
exports.getProjectsByClient = async (req, res) => {
    const { client_id } = req.params;
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('client_id', client_id)
            .order('created_at', { ascending: false });
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching projects by client:', error.message);
        res.status(500).json({ error: 'Internal Server Error, failed to fetch projects by client' });
    }
};

// POST /projects
exports.createProject = async (req, res) => {
    const { client_id, name, description, status, start_date, due_date } = req.body;
    if (!name || !description || !client_id) {
        return res.status(400).json({ error: 'Name, description, and client_id are required' });
    }

    try {
        const { data, error } = await supabase
            .from('projects')
            .insert([{ client_id, name, description, status, start_date, due_date }])
            .select()
            .single();
        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        console.error('Error creating project:', error.message);
        res.status(500).json({ error: 'Internal Server Error, failed to create project' });
    }
};

// PUT /projects/:id
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (!name || !description || !client_id) {
        return res.status(400).json({ error: 'Name, description, and client_id are required' });
    }

    try {
        const { data, error } = await supabase
            .from('projects')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Project not found' });
        res.status(200).json(data);
    } catch (error) {
        console.error('Error updating project:', error.message);
        res.status(500).json({ error: 'Internal Server Error, failed to update project' });
    }
};

// DELETE /projects/:id
exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Project not found' });
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error.message);
        res.status(500).json({ error: 'Internal Server Error, failed to delete project' });
    }
};