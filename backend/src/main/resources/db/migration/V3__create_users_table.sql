CREATE TABLE users
(
    id          UUID PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(100) NOT NULL,
    username    VARCHAR(100) NOT NULL UNIQUE,
    password    VARCHAR(100) NOT NULL,
    create_time TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    role        VARCHAR(50)  NOT NULL,
    enabled     BOOLEAN               DEFAULT TRUE,
    CONSTRAINT role_check CHECK (
        role IN ('USER', 'ADMIN', 'MANAGER')
        )
);
