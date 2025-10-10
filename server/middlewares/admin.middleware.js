export const isAdmin = (req, res, next) => {
  console.log('Checking admin access for user:', req.user?.username, 'Role:', req.user?.role);
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};