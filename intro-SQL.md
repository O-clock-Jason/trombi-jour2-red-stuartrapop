# intro SQL

## Se connecter à une base de données avec le terminal

`psql -h <adresse du serveur> -d <nom de la base> -U <login>`

Par exemple (accessible uniquement depuis le VPN) : 

`psql -h pg.oclock.lan -d trombi -U etudiant`

Une fois connecté, on a une invite de commande qui ressemble à : 
```
trombi=>
```

## quelques commandes de base

- `\?` pour afficher l'aide.
- `q` pour quitter le mode interactif.
- `\dt` pour lister les tables de la base de données
- `\du` pour lister les utilisateurs qui peuvent se connecter
- `\l` pour lister les base de données dispo dans le serveur.
- `\d nom_table` pour décrire la "forme" d'une table (ses champs, leurs types,...)
- `\q` ou `Ctrl+D` pour quitter l'invite de commande psql.

## du vrai SQL !

### Selectionner des données

pour demander des données à un serveur de BDD, on utilise la syntaxe : 

```sql
SELECT * FROM nom_table;
```

**Remarque** : les majuscules ne sont pas obligatoires, mais par convention, on écrit les mot clefs SQL en majuscule, pour ne pas les confondre avec un nom de variable ou autre chose du genre...

### Selectionner des données plus précises

Si on veut selectionner uniquement un ou plusieurs champs dans une table.

```sql
SELECT nom_table.nom_champ1, nom_table.nom_champ2 FROM nom_table;
```

MAIS on peut aller plus vite, pas besoin de redonner le nom de la table : 
```sql
SELECT champ1, champ2 FROM nom_table;
```

EXEMPLE : pour selectionner le nom et le prénom de tous les étudiants.
```sql
SELECT first_name, last_name FROM student;
```

### Filtrer des données avec des conditions

Pour rajouter de conditions, on utilise le mot clef `WHERE` :

```sql
SELECT * FROM nom_table WHERE champ='valeur';
```

Les conditions possibles sont : 
- une égalité: `machin=truc`
- inférieur/supérieur : `valeur>5` ou `valeur<=10`
- et d'autres qu'on verra plus tard ;)
- et on peut combiner les conditions avec les mots clefs `AND` et `OR`.


EXEMPLE : je veux toutes les infos des étudiants de la promo 175.
```sql
SELECT * FROM student WHERE promo_id=175;
```

### Ranger les données

Pour trier des résultats selon un ordre fixe, on utilise le mot clef `ORDER BY`.

```sql
SELECT * FROM nom_table ORDER BY champ ASC;
```

- `ASC` pour ascendant (= dans l'ordre croissant)
- `DESC` pour descendant (= dans l'ordre décroissant)
- Note: si on ne met rien, c'est `ASC` par défaut.

EXEMPLE : je veux TOUS les étudiants, classés par nom de famille alphabétique.
```sql
SELECT * FROM student ORDER BY last_name ASC;
```

On peut donner plusieurs méthodes de tri, séparées par des virgules. L'ordre dans lequel on les écrit sera l'ordre de priorité.

EXEMPLE : je veux tous les étudiants, classés par nom de famille PUIS par prénom
```sql
SELECT * FROM student ORDER BY last_name ASC, first_name ASC;
```

## on combine ?

Je veux les étudiants de la promo 175, triés par nom de famille décroissant.

```sql
SELECT * FROM student
WHERE promo_id=175
ORDER BY last_name DESC;
```

### et dans le code alors ????

direction le fichier test_sql.js !