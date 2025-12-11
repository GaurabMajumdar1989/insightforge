from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Response, status
#from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.note import Note
from app.deps import get_db
from app.schemas.note_schemas import NoteCreate, NoteUpdate
from app.services.ai_service import gemini_call

router = APIRouter(prefix="/notes", tags=["Notes"])


@router.get("/")
async def get_notes(db: Session = Depends(get_db)):
    result = db.execute(select(Note))
    notes = result.scalars().all()
    return notes


@router.post("/")
async def create_note(note: NoteCreate, db: Session = Depends(get_db)):
    new_note = Note(text=note.text)

    db.add(new_note)
    db.commit()
    db.refresh(new_note)

    return new_note


@router.delete("/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_note(note_id: UUID, db: Session = Depends(get_db)):
    result = db.execute(select(Note).where(Note.id == note_id))
    note = result.scalars().first()

    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    db.delete(note)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.patch("/{note_id}")
async def update_note(note_id: UUID, payload: NoteUpdate, db: Session = Depends(get_db)):
    result = db.execute(select(Note).where(Note.id == note_id))
    note = result.scalars().first()

    if not note:
        raise HTTPException(status_code=404, detail="Your note does not exist")

    note.text = payload.text # type: ignore[attr-defined]
    db.commit()
    db.refresh(note)

    return note


@router.post("/{note_id}/ai")
async def ai_assist(note_id: UUID, payload: dict, db: Session = Depends(get_db)):
    mode = payload.get("mode")

    result = db.execute(select(Note).where(Note.id == note_id))
    note = result.scalars().first()

    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    text = note.text

    if mode == "summary":
        prompt = f"Summarize this note in simple words:\n{text}"
    elif mode == "insight":
        prompt = f"Read this note and generate deep insights people might miss:\n{text}"
    else:
        raise HTTPException(status_code=400, detail="Invalid mode")

    ai_output = await gemini_call(prompt)

    return {"result": ai_output}
