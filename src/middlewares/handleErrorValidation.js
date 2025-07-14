import { validationResult } from 'express-validator'

const handleErrorValidation = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

export default handleErrorValidation
