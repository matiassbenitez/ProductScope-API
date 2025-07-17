import jwt from 'jsonwebtoken'

const authMiddleware = {
    verifyToken: (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(401).json({ error: 'No token provided or invalid format' })
    }
    const token = authHeader.split(' ')[1]

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded
      next()
    } catch (err) {
      console.error('Token verification failed:', err)
      return res.status(403).json({ error: 'Invalid or expired token' })
    }
  },

    checkRole: (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !req.user.role) {
        return res.status(403).json({ error: 'Access denied, user role not found' })
      }
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied, insufficient permissions' })
      }
      next()
    }
  },extractUserFromToken: (authHeader) => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }
    const token = authHeader.split(' ')[1]
    try {
      return jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
      console.error('Token verification failed:', err)
      return null
    }
  }
}
export default authMiddleware