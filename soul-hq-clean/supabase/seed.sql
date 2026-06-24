-- SOUL HQ seed data
-- Run this after schema.sql.

insert into public.members
(real_name, game_name, instagram_id, role, team, join_date, activity_status, driving_skill, game_skill, teamwork, behavior, warnings_count, promotion_status, alliance_tag, notes)
values
('Ankit Sharma', 'SOUL Ankit', '@ankitraj21805', 'Founder', 'Core', current_date - interval '20 days', 'Active', 92, 88, 94, 95, 0, 'Promoted', 'SYN', 'Clan lead'),
('Rahul Verma', 'SOUL Phantom', '@phantom', 'Co-Leader', 'Core', current_date - interval '19 days', 'Active', 87, 84, 90, 88, 1, 'Eligible', 'SYN', ''),
('Aman Singh', 'SOUL Viper', '@viper', 'Captain', 'Alpha', current_date - interval '18 days', 'Active', 90, 86, 89, 91, 0, 'Promoted', 'SYN', ''),
('Rohit Kumar', 'SOUL Nitro', '@nitro', 'Elite Driver', 'Alpha', current_date - interval '17 days', 'Active', 94, 80, 87, 89, 0, 'Eligible', 'SYN', ''),
('Aditya Raj', 'SOUL Shadow', '@shadow', 'Shooter', 'Alpha', current_date - interval '16 days', 'Active', 81, 91, 86, 85, 1, 'Hold', 'SYN', ''),
('Kunal Das', 'SOUL Blaze', '@blaze', 'Member', 'Bravo', current_date - interval '15 days', 'Trial', 77, 78, 80, 83, 0, 'Trial Running', 'SYN', ''),
('Deepak Yadav', 'SOUL Racer', '@racer', 'Driver', 'Bravo', current_date - interval '14 days', 'Active', 89, 75, 82, 84, 0, 'Eligible', 'SYN', ''),
('Sahil Khan', 'SOUL Reaper', '@reaper', 'Member', 'Bravo', current_date - interval '13 days', 'Active', 78, 83, 79, 78, 2, 'Hold', 'SYN', ''),
('Nikhil Jain', 'SOUL Hawk', '@hawk', 'Scout', 'Charlie', current_date - interval '12 days', 'Active', 82, 82, 86, 88, 0, 'Promoted', 'SYN', ''),
('Mohit Patel', 'SOUL Mafia', '@mafia', 'Member', 'Charlie', current_date - interval '11 days', 'Hold', 75, 76, 73, 70, 2, 'Hold', 'SYN', ''),
('Harsh Gupta', 'SOUL King', '@king', 'Content Lead', 'Media', current_date - interval '10 days', 'Active', 80, 79, 91, 90, 0, 'Eligible', 'SYN', ''),
('Vikas Thakur', 'SOUL Crown', '@crown', 'Moderator', 'Core', current_date - interval '9 days', 'Active', 84, 81, 92, 92, 0, 'Promoted', 'SYN', ''),
('Aryan Mehta', 'SOUL Drift', '@drift', 'Driver', 'Alpha', current_date - interval '8 days', 'Active', 93, 77, 85, 86, 0, 'Eligible', 'SYN', ''),
('Piyush Rai', 'SOUL Ghost', '@ghost', 'Member', 'Charlie', current_date - interval '7 days', 'Trial', 73, 76, 75, 80, 0, 'Trial Running', 'SYN', ''),
('Satyam Roy', 'SOUL Bullet', '@bullet', 'Shooter', 'Bravo', current_date - interval '6 days', 'Active', 79, 90, 84, 85, 1, 'Eligible', 'SYN', ''),
('Yash Sharma', 'SOUL Knight', '@knight', 'Member', 'Charlie', current_date - interval '5 days', 'Inactive', 70, 70, 70, 70, 3, 'Remove Review', 'SYN', ''),
('Manish Kumar', 'SOUL Falcon', '@falcon', 'Event Lead', 'Core', current_date - interval '4 days', 'Active', 83, 82, 93, 91, 0, 'Promoted', 'SYN', ''),
('Saurav Mishra', 'SOUL Venom', '@venom', 'Member', 'Bravo', current_date - interval '3 days', 'Active', 76, 84, 82, 80, 1, 'Hold', 'SYN', ''),
('Abhishek Tiwari', 'SOUL Royal', '@royal', 'Elite', 'Alpha', current_date - interval '2 days', 'Active', 88, 87, 89, 90, 0, 'Eligible', 'SYN', ''),
('Ritesh Pandey', 'SOUL Wolf', '@wolf', 'Member', 'Charlie', current_date - interval '1 days', 'Trial', 74, 75, 78, 79, 0, 'Trial Running', 'SYN', '')
on conflict do nothing;

insert into public.events (title, type, date, time, description, status)
values
('SOUL Night Run', 'Clan Meet', current_date + interval '3 days', '22:00', 'Clean driving session and team coordination.', 'Planned'),
('SYN Alliance Meet', 'Alliance', current_date + interval '5 days', '21:30', 'Alliance rules and coordination.', 'Planned'),
('Cinematic Car Shoot', 'Content', current_date + interval '7 days', '23:00', 'Instagram reels and member shots.', 'Draft')
on conflict do nothing;

insert into public.alliances (clan_name, alliance_tag, leader_instagram, status, notes)
values
('Royal Drift Crew', 'SYN', '@royaldrift', 'Active', 'Do not attack SYN players.'),
('Night Racers', 'SYN', '@nightracers', 'Pending', 'Verification pending.'),
('Blackline Mafia', 'SYN', '@blackline', 'Active', 'Fair-play alliance.')
on conflict do nothing;

insert into public.content_plan (title, type, date, status, notes)
values
('SOUL comeback story', 'Instagram Story', current_date + interval '4 days', 'Ready', 'Dark red cinematic story.'),
('SYN alliance announcement', 'Post', current_date + interval '5 days', 'Draft', 'Explain SYN rules clearly.'),
('Member role reveal', 'Reel', current_date + interval '8 days', 'Idea', 'Show roles and cars.')
on conflict do nothing;

insert into public.tryouts (name, game_name, instagram_id, active_time, driving_skill, game_skill, message, status)
values
('Demo Player', 'Demo Racer', '@demo', '9 PM - 12 AM', 78, 80, 'I want to join SOUL and play fair.', 'Pending')
on conflict do nothing;
