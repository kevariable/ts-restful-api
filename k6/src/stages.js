import http from 'k6/http';

export const options = {
    stages: [
        {
            duration: '10s',
            target: 20
        },
        {
            duration: '10s',
            target: 10
        },
        {
            duration: '10s',
            target: 0
        },
    ]
};

export default function() {
    http.get('http://app:3000/api/ping');
}
