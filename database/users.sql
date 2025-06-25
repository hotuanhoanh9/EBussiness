create table users
(
    id            bigint generated always as identity
        primary key,
    username      varchar(255) not null
        unique,
    email         varchar(255) not null
        unique,
    password_hash varchar(255) not null,
    created_at    timestamp with time zone default now(),
    last_login    timestamp with time zone
);

alter table users
    owner to postgres;

