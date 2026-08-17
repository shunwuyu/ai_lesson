import NoteEditor from '@/components/NoteEditor'
import {getNote} from '@/lib/redis';
import { sleep } from '@/lib/utils';
export default async function EditPage({ params }) {
  // 新版本 params 是 Promise，需 await 解包
  const { id: noteId } = await params;
  const note = await getNote(noteId)

  // 让效果更明显
  await sleep(5000);

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    )
  }

  return <NoteEditor noteId={noteId} initialTitle={note.title} initialBody={note.content} />
}

