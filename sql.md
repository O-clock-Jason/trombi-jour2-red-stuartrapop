## toutes les promos, dans l'ordre alphabétique

SELECT * FROM promo ORDER BY name;

## tous les étudiants, dans l'ordre alphabétique des noms de famille
SELECT * FROM student ORDER BY last_name ASC, first_name ASC;

## tous les étudiants de la promo 135

SELECT * FROM student WHERE promo_id = 135 ORDER BY last_name ASC, first_name ASC;


## les étudiants dont le nom ou le prénom ressemble à "max"
SELECT * FROM student WHERE upper(first_name) LIKE '%MAX%' OR upper(last_name) LIKE '%MAX%';

