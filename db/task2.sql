-- return a count of drg values (num_drgs) in gmc_2019 that are
-- also in cds and reimburse tables as 'drg_code'
SELECT gmc_2019.drg, count(*) as num_drgs
FROM gmc_2019
LEFT JOIN cds ON gmc_2019.drg = cds.drg_code
WHERE
    gmc_2019.drg = cds.drg AND
LEFT JOIN 
    reimburs ON gmc_2019.drg = reimburs.drg_code
WHERE
    gmc_2019.drg = reimburs.drg_code



---------

--left join will consider the rows if they are present in gmc_2019.drg even if they are not present in the opther 2 tables

SELECT count(*) as num_drgs from (
    SELECT gmc_2019.drg
    FROM gmc_2019
    INNER JOIN cds ON gmc_2019.drg = cds.drg_code
    INNER JOIN reimburs ON gmc_2019.drg = reimburs.drg_code
GROUP BY gmc_2019.drg)


