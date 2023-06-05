import { NextRequest, NextResponse } from 'next/server'

// コンセプトAページとコンセプトBページをランダムでユーザーに表示させる処理
// middleware.tsはページファイルと同階層にある必要がある

// configで定義
export const config = {
  matcher: '/',
}

// ユーザーがこのサイトにアクセスしてきた時に、そのリクエストに含まれるクッキーから
// 'ab-test'の名前のクッキーを取り出す
// 最初にアクセスしたときは、'ab-test'はそもそも設定されていないので
// if (!bucket)⇒取得した値が存在しない場合がtrueになる為、if文の中身が実行される
export function middleware(req: NextRequest) {
  // COOKIE_NAMEを定義
  const COOKIE_NAME = 'ab-test'
  let bucket = req.cookies.get(COOKIE_NAME)
  //   Mathのランダムで0~1の値を生成し、0.5より小さい場合はbucketの値をnew,それ以外はold
  if (!bucket) {
    bucket = Math.random() < 0.5 ? 'new' : 'old'
  }
  //   bucketの値がnewの場合は、'/renewal'そうじゃない場合は、'/'
  const path = bucket === 'new' ? '/renewal' : '/'

  //   ランダムに設定されたpathを使ってNextResponseのrewriteを実行しアクセスしてきたユーザーに対して2分の1で古いサイトか新しいサイトを表示させる
  const res = NextResponse.rewrite(new URL(path, req.url))

  //   送られてきたリクエストのクッキーに'ab-test'の値が含まれない場合は下記を実行
  // 例　初回アクセス時、クッキーをクリアした後にアクセスした時
  // 処理内容　クッキーの値を新しく'ab-test'と名前をつけてランダムにサイトを表示させる
  if (!req.cookies.get(COOKIE_NAME)) {
    res.cookies.set(COOKIE_NAME, bucket)
  }

  return res
}
