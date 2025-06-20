CREATE TABLE tasks
(
    id           UUID PRIMARY KEY,
    title        VARCHAR(255) NOT NULL,
    description  TEXT,

    status       VARCHAR(50)  NOT NULL
        CONSTRAINT status_check CHECK (
            status IN ('TODO', 'IN_PROGRESS', 'DONE')
            ),

    priority     VARCHAR(50)  NOT NULL
        CONSTRAINT priority_check CHECK (
            priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT')
            ),

    due_date     DATE,
    is_completed BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
