"""Fix timestamps default

Revision ID: 02cf23ba0590
Revises: a534fa8accb1
Create Date: 2025-12-12 16:58:13.528761

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '02cf23ba0590'
down_revision: Union[str, Sequence[str], None] = 'a534fa8accb1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # Set NOT NULL and default for created_at
    op.alter_column(
        'notes',
        'created_at',
        existing_type=sa.DateTime(timezone=True),
        server_default=sa.text('now()'),
        nullable=False
    )

    # Set NOT NULL and default for updated_at
    op.alter_column(
        'notes',
        'updated_at',
        existing_type=sa.DateTime(timezone=True),
        server_default=sa.text('now()'),
        nullable=False
    )


def downgrade() -> None:
    # Revert defaults and nullability
    op.alter_column(
        'notes',
        'created_at',
        existing_type=sa.DateTime(timezone=True),
        server_default=None,
        nullable=True
    )

    op.alter_column(
        'notes',
        'updated_at',
        existing_type=sa.DateTime(timezone=True),
        server_default=None,
        nullable=True
    )