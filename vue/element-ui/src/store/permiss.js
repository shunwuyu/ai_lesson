import { defineStore } from 'pinia';

export const usePermissStore = defineStore('permiss', {
    state: () => {
        const defaultList = {
            admin: [
                '0',
                '1',
                '11',
                '12',
                '13',
                '2',
                '21',
                '22',
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29',
                '291',
                '292',
                '3',
                '31',
                '32',
                '33',
                '34',
                '4',
                '41',
                '42',
                '5',
                '7',
                '6',
                '61',
                '62',
                '63',
                '64',
                '65',
                '66',
            ],
            user: ['0', '1', '11', '12', '13'],
        }
        
        const username = localStorage.getItem('vuems_name');
        // console.log(username);
        return {
            key: (username == 'admin' ? defaultList.admin : defaultList.user),
            defaultList,
        };
    },
    actions: {
        handleSet(val) {
            this.key = val;
        },
    },
})