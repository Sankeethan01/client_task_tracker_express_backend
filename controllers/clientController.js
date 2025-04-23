const supabase = require('../models/supabase'); 

// GET /clients
exports.getAllClients = async (req, res) => {
    try {
        const {data, error} = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching clients:', error.message);
        res.status(500).json({ error: 'Internal Server Error, failed to fetch clients' });
    }
};

// GET /clients/count
exports.getClientsCount = async (req, res) => {
    try {
        const { count, error } = await supabase
            .from('clients')
            .select('*', { count: 'exact', head: true });

        if (error) throw error;

        res.status(200).json({ totalCount: count });
    } catch (error) {
        console.error('Error fetching clients count:', error.message, error);
        res.status(500).json({ error: 'Internal Server Error, failed to fetch clients count' });
    }
};

// GET /clients/:id
exports.getClientById = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Client not found' });
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching client:', error.message);
        res.status(500).json({ error: 'Internal Server Error, failed to fetch client' });
    }
};

// POST /clients
exports.createClient = async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email, and phone are required' });
    }

    try {
        const { data, error } = await supabase
            .from('clients')
            .insert([{ name, email, phone }])
            .select()
            .single();
        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        console.error('Error creating client:', error.message);
        res.status(500).json({ error: 'Internal Server Error, failed to create client' });
    }
};

// PUT /clients/:id
exports.updateClient = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email, and phone are required' });
    }

    try {
        const { data, error } = await supabase
            .from('clients')
            .update({ name, email, phone })
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Client not found' });
        res.status(200).json(data);
    } catch (error) {
        console.error('Error updating client:', error.message);
        res.status(500).json({ error: 'Internal Server Error, failed to update client' });
    }
};

// DELETE /clients/:id
exports.deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('clients')
            .delete()
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Client not found' });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting client:', error.message);
        res.status(500).json({ error: 'Internal Server Error, failed to delete client' });
    }
};