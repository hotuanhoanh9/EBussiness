create table products
(
    id           bigint generated always as identity
        primary key,
    name         varchar(255)     not null,
    price        double precision not null,
    sold_number  integer,
    image_path   varchar(255),
    salepercent  numeric,
    sale_percent integer
);

alter table products
    owner to postgres;

