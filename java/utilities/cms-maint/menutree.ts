// import { MenuItem } from './../../../../docs/assets/data-and-config/menus-and-other-contexts/menu-tree';
import { Injectable } from '@angular/core';
import { LabeledStatement } from 'typescript';

export interface MenuItem {
    uniqueKey: string;
    parentKey: string;
    parent?: boolean;// also use for expand
    child: boolean
    key: string;
    label: string;
    roles: string[]; // unused for now ;
    children?: MenuItem[];
    dateUploaded?: string;
};
// flat structure - use uniqueKey - parentKey as one to many relationsho[

export const MenuTree: MenuItem[] = [
    { label: 'Changers: before 2022', child: false, uniqueKey: '', parentKey: 'art', key: 'changers-b4-2022', roles: ['all'] },
    { label: ' - 2022', child: true, uniqueKey: '', parentKey: 'art', key: 'changers-2022', roles: ['all'] },
    { label: ' - 2023', child: true, uniqueKey: '', parentKey: 'art', key: 'changers-2023', roles: ['all'] },
    { label: 'The Best: before 2022', child: false, uniqueKey: '', parentKey: 'art', key: 'showpiece', roles: ['all'] },
    { label: '- 2022', child: false, uniqueKey: '', parentKey: 'art', key: 'showpiece-2022', roles: ['all'] },
    { label: '- 2023', child: false, uniqueKey: '', parentKey: 'art', key: 'showpiece-2023', roles: ['all'] },
    { label: 'Latest Uploads', child: false, uniqueKey: '', parentKey: 'art', key: 'latest-uploads', roles: ['relgion', 'all'] },
    { label: 'Shree Ganesh: pre Q42021 ', child: false, uniqueKey: '', parentKey: 'art', key: 'shree-ganesh', roles: ['relgion', 'all'], dateUploaded: '12-11-2021' },
    { label: '- Q4 2021 onward', child: true, uniqueKey: '', parentKey: 'Shree Ganesh', key: 'shree-ganesh-gte-q4-2021', roles: ['relgion', 'all'], dateUploaded: '01-31-2023' },
    { label: '- Q1 2023 onward', child: true, uniqueKey: '', parentKey: 'Shree Ganesh', key: 'shree-ganesh-gte-q1-2023', roles: ['relgion', 'all'], dateUploaded: '03-23-2023' },
    { label: 'Goddesses', child: false, uniqueKey: '', parentKey: 'art', key: 'devi', roles: ['relgion', 'all'], dateUploaded: '01-29-2023' },
    { label: 'Mahadev', child: false, uniqueKey: '', parentKey: 'art', key: 'mahadev', roles: ['relgion', 'all'], dateUploaded: '02-01-2023' },
    { label: 'Mahadev and Family', child: false, uniqueKey: '', parentKey: 'art', key: 'mahadev-family', roles: ['relgion', 'all'], dateUploaded: '05-04-2023' },
    { label: 'Laxmi, Narayan, Shree Ram, and family, Bajrangbali', child: false, uniqueKey: '', parentKey: 'art', dateUploaded: '02-05-2023', key: 'laxmi-vishnu-hanuman', roles: ['relgion', 'all'] },
    { label: 'Spiritual Souls:Datta Lineage, Sikhs, East of India', child: false, uniqueKey: '', parentKey: 'art', dateUploaded: '02-13-2023', key: 'dattavatar', roles: ['relgion', 'all'] },
    { label: 'Shree Swami Samartha', child: false, uniqueKey: '', parentKey: 'art', key: 'swami-samartha', roles: ['relgion', 'all'], dateUploaded: '04-24-2023' },
    { label: 'Shirdi Sai: to  Q3 2021', child: false, uniqueKey: '', parentKey: 'art', parent: true, key: 'shirdi-sai-q1-q2-2021', roles: ['relgion', 'all'], dateUploaded: '02-07-2023'  },
    { label: '- Q3 2021 - Q1 2022', child: true, uniqueKey: '', parentKey: 'Shirdi Sai', key: 'shirdi-sai-q3-q4-2021', roles: ['relgion', 'all'], dateUploaded: '03-31-2022' },
    { label: '- Q2 Q3 2022', child: true, uniqueKey: '', parentKey: 'Shirdi Sai', key: 'shirdi-sai-q2-q3-2022', roles: ['relgion', 'all'], dateUploaded: '02-07-2023' },
    { label: '- Q3,Q4 2022 Q1 2023', child: true, uniqueKey: '', parentKey: 'Shirdi Sai', key: 'shirdi-sai-q4-2022-q1-2023', roles: ['relgion', 'all'], dateUploaded: '03-02-2023' },
    { label: '- Q2 Q3 2023', child: true, uniqueKey: '', parentKey: 'Shirdi Sai', key: 'shirdi-sai-q2-q3-2023', roles: ['relgion', 'all'], dateUploaded: '05-16-2023' },
    { label: '- Sai Satcharitra', child: true, uniqueKey: '', parentKey: 'Shirdi Sai', key: 'baba-themes-1', roles: ['relgion', 'all'], dateUploaded: '02-28-2022' },
    { label: 'People', child: false, uniqueKey: '', parentKey: 'art', key: 'people-places', roles: ['nonLiving', 'all'], dateUploaded: '02-02-2023' },
    { label: 'Places, Scenes and Objects', child: false, uniqueKey: '', parentKey: 'art', key: 'places-scenes-objects', roles: ['nonLiving', 'all'], dateUploaded: '03-02-2023' },
    { label: 'Misc, Themes', child: false, uniqueKey: '', parentKey: 'art', key: 'themes-misc', roles: ['nonLiving', 'all'], dateUploaded: '05-14-2023' },
    { label: 'Anim Unorganized', child: false, uniqueKey: '', parentKey: 'art', key: 'animate-to-be-oragnized1', roles: ['nonLiving', 'all'], dateUploaded: '02-03-2022' },
    { label: 'Rail', child: false, uniqueKey: '', parentKey: 'art', key: 'trains', roles: ['nonLiving', 'all'], dateUploaded: '02-08-2023' },
    { label: ' - IR WDM2', child: true, uniqueKey: '', parentKey: 'Rail', key: 'trains-ir-alcos', roles: ['nonLiving', 'all'], dateUploaded: '11-28-2022' },
    { label: ' - IR trains)', child: true, uniqueKey: '', parentKey: 'Rail', key: 'trains-ir-special-trains', roles: ['nonLiving', 'all'], dateUploaded: '02-02-2023' },
    { label: 'Mumbai Meri Jaan', child: false, uniqueKey: '', parentKey: 'art', key: 'mumbai-meri-jaan', roles: ['nonLiving', 'all'], dateUploaded: '11-28-2022' },
    { label: ' - Q1 2023 onward', child: true, uniqueKey: '', parentKey: 'Mumbai Meri Jaan', key: 'mumbai-meri-jaan-2', roles: ['nonLiving', 'all'], dateUploaded: '01-29-2023' },
    { label: 'Aircraft, Ships and Cars', child: false, uniqueKey: '', parentKey: 'art', key: 'planes', roles: ['nonLiving', 'all'], dateUploaded: '02-14-2023' },
    { label: '- Q2 2023 onward', child: false, uniqueKey: '', parentKey: 'art', key: 'planesQ12023', roles: ['nonLiving', 'all'], dateUploaded: '05-12-2023' }];
@Injectable()
export class MenuNav {
    _menuTree: MenuItem[] = [
        { label: 'Evolution', child: false, uniqueKey: '', parentKey: 'art', key: 'changers-b4-2022', roles: ['all'] },
        { label: 'The Best', child: false, uniqueKey: '', parentKey: 'art', key: 'showpiece', roles: ['all'] },
        { label: 'Latest Uploads', child: false, uniqueKey: '', parentKey: 'art', key: 'latest-uploads', roles: ['relgion', 'all'] },
        { label: 'Shree Ganesh ', child: false, uniqueKey: '', parentKey: 'art', key: 'shree-ganesh', roles: ['relgion', 'all'], dateUploaded: '12-11-2021' },
        { label: 'Shree Ganesh Q4 2021 onward', child: false, uniqueKey: '', parentKey: 'art', key: 'shree-ganesh-gte-q4-2021', roles: ['relgion', 'all'], dateUploaded: '12-14-2021' },
        { label: 'Goddesses', child: false, uniqueKey: '', parentKey: 'art', key: 'devi', roles: ['relgion', 'all'] },
        { label: 'Mahadev', child: false, uniqueKey: '', parentKey: 'art', key: 'mahadev', roles: ['relgion', 'all'], dateUploaded: '12-13-2021' },
        { label: 'Mahadev and Family', child: false, uniqueKey: '', parentKey: 'art', key: 'mahadev-family', roles: ['relgion', 'all'], dateUploaded: '12-11-2021' },
        { label: 'Laxmi, Narayan, Shree Ram, and family, Bajrangbali', child: false, uniqueKey: '', parentKey: 'art', key: 'laxmi-vishnu-hanuman', dateUploaded: '01-19-2022', roles: ['relgion', 'all'] },
        { label: 'Satgurus of Lord Datta Lineage', child: false, uniqueKey: '', parentKey: 'art', key: 'dattavatar', roles: ['relgion', 'all'] },
        { label: 'Shree Swami Samartha', child: false, uniqueKey: '', parentKey: 'art', key: 'swami-samartha', roles: ['relgion', 'all'], dateUploaded: '12-09-2021' },
        { label: 'Shirdi Sai Q1 Q2(+Q3)2021', child: false, uniqueKey: '', parentKey: 'art', key: 'shirdi-sai-q1-q2-2021', roles: ['relgion', 'all'] },
        { label: 'Shirdi Sai Q3 Q4 2021', child: false, uniqueKey: '', parentKey: 'art', key: 'shirdi-sai-q3-q4-2021', roles: ['relgion', 'all'], dateUploaded: '12-12-2021' },
        { label: 'Shirdi Sai Satcharitra', child: false, uniqueKey: '', parentKey: 'art', key: 'baba-themes-1', roles: ['relgion', 'all'], dateUploaded: '12-06-2021' },
        { label: 'People', child: false, uniqueKey: '', parentKey: 'art', key: 'people-places', roles: ['nonLiving', 'all'], dateUploaded: '02-24-2022' },
        { label: 'Places, Scenes and Objects', child: false, uniqueKey: '', parentKey: 'art', key: 'places-scenes-objects', roles: ['nonLiving', 'all'], dateUploaded: '12-06-2021' },
        { label: 'Misc, Themes', child: false, uniqueKey: '', parentKey: 'art', key: 'themes-misc', roles: ['nonLiving', 'all'] },
        { label: 'Rail', child: false, uniqueKey: '', parentKey: 'art', key: 'trains', roles: ['nonLiving', 'all'], dateUploaded: '12-08-2021' },
        { label: 'Aircraft, Ships and Cars', child: false, uniqueKey: '', parentKey: 'art', key: 'planes', roles: ['nonLiving', 'all'], dateUploaded: '07-20-2022' },];

    get MenuTree(): MenuItem[] {
        return this._menuTree;
    }

};