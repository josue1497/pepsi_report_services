import request from '@/utils/request';

const instalationService = {
    getAll() {
        return request({
            url: `/instalation/get_all`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    saveInstalation(data) {
        return request({
            url: `/instalation`,
            method: 'post',
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    updateInstalation(data, instalation_id) {
        return request({
            url: `/instalation/${instalation_id}`,
            method: 'put',
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};

// Route::resource('instalation', 'InstalationsController');
export default instalationService;