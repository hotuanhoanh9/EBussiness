create table category
(
    id         bigint generated always as identity
        primary key,
    name       text not null,
    image_path text
);

alter table category
    owner to postgres;

