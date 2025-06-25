create table pricing_product
(
    id            bigint generated always as identity
        primary key,
    account_id    bigint
        references account,
    pricing_range text,
    images_path   text,
    can_used      boolean,
    status        integer,
    closing_price numeric,
    acceptflg     boolean
);

alter table pricing_product
    owner to postgres;

