import {cleanXSS} from './validation.js';
import {consoleColorfulMessage} from './util/consoleColorfulMessage.js'

var index = {
    init : function() {
        var _this = this;
        $('#btn-save').on('click', function() {
            _this.save();
        });
        $('#btn-update').on('click', function() {
            _this.update();
        });
        $('#btn-delete').on('click', function() {
            _this.delete();
        });

        consoleColorfulMessage('안녕하세요 \n 개발자 도구는 \n 왜 여시나요?');

    },
    save : function() {
        var data = {
            title: $('#title').val(),
            author: $('#author').val(),
            content: $('#content').val()
        };

        for(let key in data) {
            data[key] = cleanXSS(data[key]);
        }

        $.ajax({
            type: 'POST',
            url: '/api/v1/posts',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function () {
            alert('글이 등록되어따');
            window.location.href = '/main';
        }).fail(function (error) {
            alert(JSON.stringify(error));
        });
    },
    update: function() {
        var data = {
            title: $('#title').val(),
            content: $('#content').val()
        };
        var id = $('#id').val();

        for(let key in data) {
            data[key] = cleanXSS(data[key]);
        }

        $.ajax({
            type: 'PUT',
            url: '/api/v1/posts/'+id,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function() {
            alert('글이 수정되어따');
            window.location.href='/main';
        }).fail(function(error) {
            alert(JSON.stringify(error));
        })
    },
    delete: function () {
        var id = $('#id').val();

        $.ajax({
            type: 'DELETE',
            url: '/api/v1/posts/' + id,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8'
        }).done(function() {
            alert('글이 삭제되었다ㅋㅋ');
            window.location.href = '/main';
        }).fail(function(error) {
            alert(JSON.stringify(error));
        })
    }
};
index.init();