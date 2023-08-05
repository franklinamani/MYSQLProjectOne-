# CMPT 310 Laboratory 1

The purpose of this lab is to re-familiarize yourselves with simple
SQL SELECT statements. You must complete and hand-in the crossword puzzle below. In order to complete the puzzle, you will need to familiarize yourself with MySQL, specifically SELECT statements and the ORDER BY and LIMIT parameters.
In addition to a physical copy, you must also create an online answer key.

For the full specification refer to the lab assignment.

## Cloning

Start your lab by cloning this repository:

```
$> git clone https://submit.cs.kingsu.ca/PATH/TO/YOUR/REPO.git
```

**Note**: The URL for your repo can be found at https://submit.cs.kingsu.ca.

Open your assignment in the editor of your choice:

```
$> nano src/html/lab1.php
```

Encode **all** of the clues as SQL queries.

### Building

```
$> docker-compose up
```

**Note**: `docker-compose up` builds, (re)creates, starts, and attaches to containers for a service. The first time it is run, it takes some time to complete.
**Be aware** you will need at least `1 GB` of memory to download and run the web and database images of this lab.

### Running

To view your current work, visit:

http://localhost:8080

### General Program Requirements

- All of your queries must result in a single result in a column named `` `Word` ``

**Note**: Be sure to use the right quotation marks when writing queries. You will need to use the backtick sign ( ` ) often and not the single/double quotation marks.

### Submission

```
$> git add src/html
$> git commit -m "Lab 1 Submission"
$> git push
```

### Helpful Hints

- http://dev.mysql.com/doc/refman/8.0/en/select.html
- http://www.w3schools.com/sql/
