"""Fix timestamps to timestamptz

Revision ID: c666b90146bb
Revises: 2af868473048
Create Date: 2025-12-09 14:37:48.552719

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fix_timestamps_timestamptz'
down_revision: Union[str, Sequence[str], None] = '2af868473048'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    # Convert naive timestamps (IST) into proper timestamptz
    op.execute("""
        ALTER TABLE notes
        ALTER COLUMN created_at TYPE timestamptz
        USING created_at AT TIME ZONE 'Asia/Calcutta';
    """)

    op.execute("""
        ALTER TABLE notes
        ALTER COLUMN updated_at TYPE timestamptz
        USING updated_at AT TIME ZONE 'Asia/Calcutta';
    """)


def downgrade():
    # Revert back to naive timestamps (not recommended)
    op.execute("""
        ALTER TABLE notes
        ALTER COLUMN created_at TYPE timestamp
        USING created_at;
    """)

    op.execute("""
        ALTER TABLE notes
        ALTER COLUMN updated_at TYPE timestamp
        USING updated_at;
    """)
