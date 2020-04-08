CREATE TABLE transactions (
    id VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    value_in FLOAT NOT NULL, 
    value_out FLOAT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE entries (
    id BIGSERIAL NOT NULL,
    transaction_id VARCHAR(255) NOT NULL,
    is_in BOOLEAN NOT NULL,
    value FLOAT NOT NULL,
    address VARCHAR(255) NOT NULL
);
