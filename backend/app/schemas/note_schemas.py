from pydantic import BaseModel
from uuid import UUID

class NoteBase(BaseModel):
    text: str

class NoteCreate(NoteBase):
    pass

class NoteUpdate(NoteBase):
    pass

class NoteRead(NoteBase):
    id: UUID
    created_at: str
    updated_at: str

    class Config:
        from_attributes = True
