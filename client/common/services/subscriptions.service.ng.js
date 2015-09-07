angular
    .module('ethdev')
    .factory('SubscriptionsService', SubscriptionsService);

/**
 * This factory is responsible for managing Meteor subscriptions
 * @param $meteor
 * @returns {{}}
 * @constructor
 */
function SubscriptionsService($meteor) {

    // Current subscriptions
    var subscriptions = [];

    var Versions = {
        subscribe: function(){
            subscribe('docs:versions');
            //console.log('Subscribed to all versions');
        },
        unsubscribe: function(){
            unsubscribe('docs:versions');
            //console.log('Unsubscribed from all versions');
        }
    };

    var Version = {
        subscribe: function(version){
            subscribe('docs:version', [
                version
            ]);
            subscribe('docs:projects', [
                version
            ]);
            //console.log('Subscribed to version: ' + version);
            //console.log('Subscribed to all projects in version: ' + version);
        },
        unsubscribe: function(version){
            unsubscribe('docs:version', [
                version
            ]);
            unsubscribe('docs:projects', [
                version
            ]);
            //console.log('Unsubscribed from version: ' + version);
            //console.log('Unsubscribed from all projects in version: ' + version);
        }
    };

    var Project = {
        subscribe: function(version, project){
            subscribe('docs:project', [
                version,
                project
            ]);
            subscribe('docs:compounds', [
                version,
                project
            ]);
        },
        unsubscribe: function(version, project){
            unsubscribe('docs:project', [
                version,
                project
            ]);
            unsubscribe('docs:compounds', [
                version,
                project
            ]);
        }
    };

    var Compound = {
        subscribe: function(version, project, compound){
            subscribe('docs:compound', [
                version,
                project,
                compound
            ]);
        },
        unsubscribe: function(version, project, compound){
            unsubscribe('docs:compound', [
                version,
                project,
                compound
            ]);
        }
    };

    var Wikis = {
        subscribe: function(){
            subscribe('docs:wikis');
            //console.log('Subscribed to all wikis');
        },
        unsubscribe: function(){
            unsubscribe('docs:wikis');
            //console.log('Unsubscribed from all wikis');
        }
    };

    var Wiki = {
        subscribe: function(wiki){
            subscribe('docs:wiki', [
                wiki
            ]);
            subscribe('docs:pages', [
                wiki
            ]);
            //console.log('Subscribed to wiki: ' + wiki);
            //console.log('Subscribed to all pages in wiki: ' + wiki);
        },
        unsubscribe: function(wiki){
            unsubscribe('docs:wiki', [
                wiki
            ]);
            unsubscribe('docs:pages', [
                wiki
            ]);
            //console.log('Unsubscribed from wiki: ' + wiki);
            //console.log('Unsubscribed from all pages in wiki: ' + wiki);
        }
    };

    var Page = {
        subscribe: function(wiki, page){
            subscribe('docs:page', [
                wiki,
                page
            ]);
            //console.log('Subscribed to page: ' + page + ' (wiki: ' + wiki + ')');
        },
        unsubscribe: function(wiki, page){
            unsubscribe('docs:page', [
                wiki,
                page
            ]);
            //console.log('Unsubscribed from page: ' + page + ' (wiki: ' + wiki + ')');
        }
    };

    return {
        versions: Versions,
        version: Version,
        project: Project,
        compound: Compound,
        wikis: Wikis,
        wiki: Wiki,
        page: Page
    };

    function subscribe(key, args){

        // If no arguments supplied
        args = typeof args !== 'undefined' ? args : [];

        // Copy args array by value
        var subscribeParams = args.slice();

        // Append key as a first element
        subscribeParams.unshift(key);

        $meteor.subscribe.apply(this, subscribeParams).then(function(subscriptionHandle){

            if (!subscriptions[key]){
                subscriptions[key] = []
            }

            var argString = _arrayToString(args);

            subscriptions[key][argString] = subscriptionHandle;

        });

    }

    function unsubscribe(key, args){

        // If no arguments supplied
        args = typeof args !== 'undefined' ? args : [];

        if (subscriptions[key]) {

            var argString = _arrayToString(args);

            if (subscriptions[key][argString]) {
                subscriptions[key][argString].stop();
                delete subscriptions[key][argString];
            }

        }

    }

    function _arrayToString(arr){
        return arr.join(":");
    }

}