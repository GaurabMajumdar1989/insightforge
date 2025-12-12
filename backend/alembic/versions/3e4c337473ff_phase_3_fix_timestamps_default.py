"""phase_3 fix timestamps default

Revision ID: 3e4c337473ff
Revises: 02cf23ba0590
Create Date: 2025-12-12 17:30:50.640420

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3e4c337473ff'
down_revision: Union[str, Sequence[str], None] = '02cf23ba0590'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Apply default NOW() to created_at
    op.execute(
        "ALTER TABLE notes ALTER COLUMN created_at SET DEFAULT now();"
    )

    # Apply default NOW() to updated_at
    op.execute(
        "ALTER TABLE notes ALTER COLUMN updated_at SET DEFAULT now();"
    )


def downgrade() -> None:
    op.execute(
        "ALTER TABLE notes ALTER COLUMN created_at DROP DEFAULT;"
    )
    op.execute(
        "ALTER TABLE notes ALTER COLUMN updated_at DROP DEFAULT;"
    )
