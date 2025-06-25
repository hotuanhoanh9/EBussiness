create table payment
(
    id             bigint generated always as identity
        primary key,
    order_id       text,
    account_id     text,
    amount         double precision,
    status         text,
    payment_method text,
    created_at     timestamp with time zone default now()
);

alter table payment
    owner to postgres;

