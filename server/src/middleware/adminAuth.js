const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: `Requires ${role} role` });
    }
    next();
  };
};

const requireAdmin = requireRole('admin');
const requireUser = requireRole('user');

export { requireAdmin, requireUser };