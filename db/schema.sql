CREATE TABLE transactions (
    id VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    value_in FLOAT, 
    created_at DATE NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (id, address)
);

CREATE TABLE entries (
    id BIGSERIAL NOT NULL,
    transaction_id VARCHAR(255) NOT NULL,
    is_in BOOLEAN NOT NULL,
    amount FLOAT,
    PRIMARY KEY (id),
    FOREIGN KEY (transaction_id) REFERENCES transactions (id) ON DELETE CASCADE
);
