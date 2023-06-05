import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/supabase'

// notesのテーブルからアイテムを取得しcreate_atで昇順を並べ替えて取得
// 取得失敗した場合、401エラーを返し、成功時は200でnotesの一覧を表示させる
export async function fetchNotes(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) return res.status(401).json(`${error.message}: ${error.details}`)
  return res.status(200).json(data)
}
