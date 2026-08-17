'use server'

import { redirect } from 'next/navigation'
import {addNote, updateNote, delNote} from '@/lib/redis';
import { revalidatePath } from 'next/cache';

// 最新写法：Server Action 直接接收组件传过来的普通参数
export async function saveNote(noteId, title, body) {
  const data = JSON.stringify({
    title,
    content: body,
    updateTime: new Date()
  })

  if (noteId) {
    updateNote(noteId, data)
    revalidatePath('/', 'layout')
    redirect(`/note/${noteId}`)
  } else {
    const res = await addNote(data)
    revalidatePath('/', 'layout')
    redirect(`/note/${res}`)
  }

}

// deleteNote 也是直接接收 noteId 参数
export async function deleteNote(noteId) {
  delNote(noteId)
  revalidatePath('/', 'layout')
  redirect('/')
}

