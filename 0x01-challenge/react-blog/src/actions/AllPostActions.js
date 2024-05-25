var alt = require('../alt');
var request = require('superagent');
var config = require('../../config');

class AllPostActions {

    loadPage(pageNum, cb) {
        var AllPostStore = require('../stores/AllPostStore');
        var state = AllPostStore.getState();
        if(!!state.postsByPage[pageNum]) {
            this.actions.updatePsots(state.postsByPage[pageNum], pageNum);
        } else {
            var self = this;

            pageNum = pageNum -1;

            var end = (pageNum * config.itemsPerPage) + config.itemsPerPage;
            var start = ((pageNum % 2) * config.itemsPerPage);

            if(typeof NProgress != 'undefined') {
                NProgress.start();
            }
            request.get(config.baseUrl+'/ajax/postsByPage/' + start + '/' + end,function(err,response){
                self.actions.updatePosts(response.body, pageNum + 1);
                setTimeout(function(){
                    if(typeof NProgress != 'undefined') {
                        NProgress.done();
                    }
                },500);
                if(!!cb){
                    cb();
                }
            });
        }
    }

    loadPostListContent() {
        var self = this;

        var AllPostStore = require('../stores/AllPostStore');
        var state = AllPostStore.getState();
        if( (!!state.postListContent.content && state.postListContent.content != '') ||
            (!!state.postListContent.header && state.postListContent.header != '')) {
            return;
