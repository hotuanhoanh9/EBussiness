create table account
(
    id           bigint generated always as identity
        primary key,
    username     varchar(255) not null,
    password     varchar(255) not null,
    account_name varchar(255),
    bank_name    varchar(255),
    bank_number  varchar(255),
    budget       double precision
);

alter table account
    owner to postgres;

