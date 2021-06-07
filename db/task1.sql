--- Please write SQL statements after the appropriate numbered lines below:

-- 1. 
select user_id, st_code, state_name from ourdata.users left join our data.geo on st_code=state;
-- 2.
select state, count(*) as number_of_users from ourdata.users group by state order by number_of_users desc;
-- 3.
select state, count(*)/population as proportion from ourdata.users left join ourdata.geo on state=st_code  group by state order by proportion desc limit 1;
--
