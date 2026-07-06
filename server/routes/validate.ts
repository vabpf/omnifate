import { Request, Response } from 'express';

export function requireFields(req: Request, res: Response, fields: string[]): boolean {
  for (const f of fields) {
    const val = req.body[f];
    if (val === undefined || val === null || val === '') {
      res.status(400).json({ error: `Thiếu trường '${f}'. Vui lòng kiểm tra lại.` });
      return false;
    }
  }
  return true;
}
