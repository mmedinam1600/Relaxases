
---------Creacion de la Base de Datos-----------
CREATE DATABASE adoo;
USE adoo;
------------------------------------------------

------------Creacion de la tabla Usuarios-------
create table `Usuarios`(
`nombre` varchar(40) not null,
`apellido` varchar(40) not null,
`curp` varchar(18) not null,
`edad` int(3) not null,
`genero` varchar(20) not null,
`email` varchar(70) not null,
`fec_nac` varchar(30) not null,
`password` varchar(100) not null,
primary key (`curp`)
) engine=InnoDB default charset=utf8;


create table `EstadoSalud`(
`porcentaje_spo2` int(10) default '0',
`fecha` timestamp NOT NULL DEFAULT current_timestamp,
`id_status` int(11) not null,
`curp_user` varchar(18),
primary key (`id_status`)
) engine=InnoDB default charset=utf8;



ALTER TABLE Usuario
    ADD PRIMARY KEY (curp);

--ALTER TABLE Usuario
--    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE Usuario;
--------------------------------------------------------------

-------------------TABLA DE ENLACES---------------
CREATE TABLE links
    (id INT(10) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(500) NOT NULL,
    descripcion TEXT,
    user_id INT(18),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    --constraint fk_user foreign key(user_id) references Usuarios(curp) on delete cascade on update cascade
);

ALTER TABLE links
	ADD FOREIGN KEY (user_id) REFERENCES Usuarios(curp);

ALTER TABLE links
    MODIFY id INT(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1

ALTER TABLE EstadoSalud
    MODIFY id_status INT(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1

DESCRIBE links;
--------------------------------------------------------------