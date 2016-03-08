/*
 * Handlebars helpers
 ******************************************************************************/
Handlebars.registerHelper("newsContent", function (context) {
    return context.replace(/\>\<video controls=\"controls\" height=\"300\"/g,'').replace(/video><\//g,'').replace(/poster/g,'poster class="hidden"');
});
Handlebars.registerHelper("ceil", function (num) {
    return num;
});
Handlebars.registerHelper("existsIn2", function (v1, v2, options) {
    console.log(v1)
    console.log(!!v1)
    console.log(v2)
    console.log(v2)
    if (!!v1||!!v2) {
        //满足添加继续执行
        return options.fn(this);
    } else {
        //不满足条件执行{{else}}部分
        return options.inverse(this);
    }
});
Handlebars.registerHelper("equals", function (v1, v2, options) {
    if (parseInt(v1) == parseInt(v2)) {
        //满足添加继续执行
        return options.fn(this);
    } else {
        //不满足条件执行{{else}}部分
        return options.inverse(this);
    }
});
Handlebars.registerHelper("isnotnull", function (obj, options) {
    try {
        if (!!obj == true && obj.length != 0) {
            //满足添加继续执行
            return options.fn(this);
        } else {
            //不满足条件执行{{else}}部分
            return options.inverse(this);
        }
    } catch (e) {
        return options.inverse(this);
    }
});
Handlebars.registerHelper("isNowBeforeTime", function (obj, options) {
    try {
        if (new Date().getTime()<obj) {
            //满足添加继续执行
            return options.fn(this);
        } else {
            //不满足条件执行{{else}}部分
            return options.inverse(this);
        }
    } catch (e) {
        return options.inverse(this);
    }
});
Handlebars.registerHelper("isNowAfterTime", function (obj, options) {
    try {
        if (new Date().getTime()>obj) {
            //满足添加继续执行
            return options.fn(this);
        } else {
            //不满足条件执行{{else}}部分
            return options.inverse(this);
        }
    } catch (e) {
        return options.inverse(this);
    }
});
//注册索引+1的helper
Handlebars.registerHelper("addOne", function (index) {
    //返回+1之后的结果
    return index + 1;
});
Handlebars.registerHelper("calculateRotate", function (index) {
    //返回计算出的旋转之后的结果
    return (index + 1) * 120 - 90;
});
Handlebars.registerHelper("calculateTop", function (index) {
    //返回计算出的旋转之后的结果
    return (index * -1) * 320;
});

Handlebars.registerHelper('reverse', function (context, options) {
    var fn = options.fn, inverse = options.inverse;
    var i = context.length - 1;
    var ret = "";

    if (context && context.length > 0) {
        for (; i >= 0; i--) {
            ret = ret + fn(context[i]);
        }
    } else {
        ret = inverse(this);
    }
    return ret;
});

Handlebars.registerHelper('if_eq', function (a, b, opts) {
    if (a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
});

// Get the name of current location(the first part of path in url)
// Example: www.sogoke.com/home/ --> 'home'
// Example: www.sogoke.com/r/1/  --> 'r'
Handlebars.registerHelper('getLocation', function (defaultLocation) {
    return window.location.pathname.split('/')[1] || defaultLocation || 'index';
});

//
Handlebars.registerHelper('setCommentPermission', function (user_id, username, suid) {
    var user = window.user, actions = '', reply = '', remove = '';

    if (user.id === user_id || user.is_superuser) {
        actions += '<a href="javascript:;" onclick="delReply(this,\'' + suid + '\');">删除</a>';
        actions += '<a href="javascript:;" onclick="response(this);">回应</a>';
    }

    return actions;
});

//
Handlebars.registerHelper('setActionPermission', function (type, creator_id, raw_id, shared_by, commented_by, favoured_by, comments_number) {
    var user = window.user,
        actions = '', comment = '', share = '', favour = '',
        location = window.location.pathname.split('/')[1] || 'index';

    if (user.id === creator_id || user.is_superuser) {
        actions += '<a data-url="/actions/delete/' + type + '/' + raw_id + '/-/' + location + '/" class="delete">删除</a>';
        if (type !== 'buzz') {
            actions += '<a href="/' + type + '/' + raw_id + '/edit/" class="edit">编辑</a>';
        }

    }

    comment = '<a href="javascript:;" data-type="' + type + '" data-raw_id="' + raw_id + '" data-fetchURL="/comments/fetch/' + type + '/' + raw_id + '/" class="embedreply" onclick="embedReply(this);"><b>回应</b><span>' + comments_number + '</span></a>';

    if (user.id === creator_id) {
        favour = '<a href="javascript:;"  class="like" data-id="' + raw_id + '"><b>喜欢</b><span>' + (favoured_by ? favoured_by.length : 0) + '</span></a>';
        share = '<a href="javascript:;" class="reprint" data-id="' + raw_id + '"><b>转载</b><span>' + (shared_by ? shared_by.length : 0) + '</span></a>';
        actions += favour + comment + share;

    } else {
        if (shared_by && shared_by.length > 0) {
            if ($.inArray(user.id, shared_by) !== -1) {
                share = '<a href="javascript:;" data-url="/actions/unshare/' + type + '/' + raw_id + '/-/' + location + '/" class="reprint reprinted" data-id="' + raw_id + '"><b>取消转载</b><span>' + (shared_by ? shared_by.length : 0) + '</span></a>';
            } else {
                share = '<a href="javascript:;" data-url="/actions/share/' + type + '/' + raw_id + '/-/' + location + '/" class="reprint" data-id="' + raw_id + '"><b>转载</b><span>' + (shared_by ? shared_by.length : 0) + '</span></a>';
            }
        } else {
            share = '<a href="javascript:;"  data-url="/actions/share/' + type + '/' + raw_id + '/-/' + location + '/" class="reprint" data-id="' + raw_id + '"><b>转载</b><span>' + (shared_by ? shared_by.length : 0) + '</span></a>';
        }

        if (favoured_by && favoured_by.length > 0) {
            if ($.inArray(user.id, favoured_by) !== -1) {
                favour = '<a href="javascript:;" data-url="/actions/unfavour/' + type + '/' + raw_id + '/-/' + location + '/" class="like liked" data-id="' + raw_id + '"><b>取消喜欢</b><span>' + (favoured_by ? favoured_by.length : 0) + '</span></a>';
            } else {
                favour = '<a href="javascript:;" data-url="/actions/favour/' + type + '/' + raw_id + '/-/' + location + '/" class="like" data-id="' + raw_id + '"><b>喜欢</b><span>' + (favoured_by ? favoured_by.length : 0) + '</span></a>';
            }
        } else {
            favour = '<a href="javascript:;"  data-url="/actions/favour/' + type + '/' + raw_id + '/-/' + location + '/" class="like" data-id="' + raw_id + '"><b>喜欢</b><span>' + (favoured_by ? favoured_by.length : 0) + '</span></a>';
        }

        actions += favour + comment + share;
    }


    return actions;
});

Handlebars.registerHelper('setFollowPermission', function (type, creator_id, raw_id, followers, comments_number) {
    var user = window.user,
        actions = '', follow = '',
        location = window.location.pathname.split('/')[1] || 'index';

    if (user.id === creator_id || user.is_superuser) {
        actions += '<a data-url="/actions/delete/' + type + '/' + raw_id + '/-/' + location + '/" class="delete">删除</a>';
        if (type !== 'buzz') {
            actions += '<a href="/' + type + '/' + raw_id + '/edit/" class="edit">编辑</a>';
        }

    }

    comment = '<a href="javascript:;" data-type="' + type + '" data-raw_id="' + raw_id + '" data-fetchURL="/comments/fetch/' + type + '/' + raw_id + '/" class="embedreply" onclick="embedReply(this);"><b>回应</b><span>' + comments_number + '</span></a>';

    if (user.id === creator_id) {
        follow = '<a href="javascript:;"  class="follow" data-id="' + raw_id + '"><b>关注</b><span>' + (followers ? followers.length : 0) + '</span></a>';
        actions += comment + follow;
    } else {

        if (followers && followers.length > 0) {
            if ($.inArray(user.id, followers) !== -1) {
                follow = '<a href="javascript:;" data-url="/actions/unfollow/' + type + '/' + raw_id + '/-/' + location + '/" class="follow followed" data-id="' + raw_id + '"><b>取消关注</b><span>' + (followers ? followers.length : 0) + '</span></a>';
            } else {
                follow = '<a href="javascript:;" data-url="/actions/follow/' + type + '/' + raw_id + '/-/' + location + '/" class="follow" data-id="' + raw_id + '"><b>关注</b><span>' + (followers ? followers.length : 0) + '</span></a>';
            }
        } else {
            follow = '<a href="javascript:;"  data-url="/actions/follow/' + type + '/' + raw_id + '/-/' + location + '/" class="follow" data-id="' + raw_id + '"><b>关注</b><span>' + (followers ? followers.length : 0) + '</span></a>';
        }

        actions = comment + follow;
    }


    return actions;
});

// Get relative time by comprare 
// the current time to given timestamp
Handlebars.registerHelper("getCreatedTime", function (timestamp) {
    var ONE_MINUTE = 60,  // seconds
        ONE_HOUR = ONE_MINUTE * 60,
        ONE_DAY = ONE_HOUR * 24,
        ONE_WEEK = ONE_DAY * 7,
        ONE_MONTH = ONE_DAY * 30,
        ONE_YEAR = ONE_MONTH * 12;

    var years, monthes, days, hours, minutes,
        date = new Date(),
    // For consistant with python timestamp
        relativeTime = date.getTime() / 1000 - timestamp,
        createdTime = '';


    if (relativeTime < 10) {
        return '刚刚';
    } else if (relativeTime >= 10 && relativeTime < ONE_MINUTE) {
        seconds = parseInt(relativeTime, 10);
        createdTime += (seconds + '秒');
    } else if (relativeTime >= ONE_MINUTE && relativeTime < ONE_HOUR) {
        minutes = parseInt(relativeTime / ONE_MINUTE, 10);
        createdTime += (minutes + '分钟');
    } else if (relativeTime >= ONE_HOUR && relativeTime < ONE_DAY) {
        hours = parseInt(relativeTime / ONE_HOUR, 10);
        createdTime += (hours + '小时');
    } else if (relativeTime >= ONE_DAY && relativeTime < ONE_WEEK) {
        days = parseInt(relativeTime / ONE_DAY, 10);
        createdTime += (days + '天');
    } else if (relativeTime >= ONE_WEEK && relativeTime < ONE_MONTH) {
        weeks = parseInt(relativeTime / ONE_WEEK, 10);
        createdTime += (weeks + '周');
    } else if (relativeTime >= ONE_MONTH && relativeTime < ONE_YEAR) {
        monthes = parseInt(relativeTime / ONE_MONTH, 10);
        createdTime += (monthes + '个月');
    } else {  //(relativeTime >= ONE_YEAR) {
        years = parseInt(relativeTime / ONE_YEAR, 10);
        createdTime += (years + '年');
    }

    return createdTime + '前';
});

Handlebars.registerHelper("formatTime", function (timestamp) {
    var format = 'yyyy/MM/dd HH:mm:ss';
    var dt = new Date(timestamp * 1000);
    return $.formatDate.date(dt, format);
});

Handlebars.registerHelper("formatPrice", function (num) {
    return num ? "￥" + num : " ";
});


// Convert unix new line symbol to htm break tag
Handlebars.registerHelper('lineBreaksBR', function (text) {
    var html = text.replace(/\n+/g, '<br />');

    return html;
});

//
Handlebars.registerHelper('showText', function (text, maxLength) {
    var i = 0;
    var digest = '';
    var full = '<input type="hidden" value="';
    var temp = '<input type="hidden" value="" />';

    if (!maxLength) {
        maxLength = 140;
    }

    if (text.length > maxLength) {
        digest = text.substr(0, maxLength - 6) + '......';
        return '<p>' + digest + '</p>' + full + text + '" />' + temp;
    } else {
        return '<p>' + text + '</p>' + temp;
    }
});

//
Handlebars.registerHelper('shorten', function (text, maxLength) {
    var ret = text || "";
    if (!maxLength) {
        maxLength = 140;
    }

    if (ret.length > maxLength) {
        ret = ret.substr(0, maxLength - 3) + "...";
    }
    return new Handlebars.SafeString(ret);
});


Handlebars.registerHelper('setDynamicCommentsPagenation', function (fetchURL, comments_number, target) {
    var $html = "",
        $total = parseInt(comments_number / 10) + 1,
        $target = target || 1;

    $html += '<div class="circle-pages ajaxPages-embedReply">';
    //重新生成分页
    if ($target > 1) {
        $html += '<a href="javascript:;" class="prev" data-page="' + ($target - 1) + '">上一页</a>';
    }
    if (comments_number > 0) {
        for (var $i = 1; $i <= $total; $i++) {
            if ($i == $target) {
                $html += '<span class="page" data-page="' + $target + '"></span>';
            } else {
                $html += '<a href="javascript:;" class="page" title="第' + $i + '页" data-page="' + $i + '"></a>';
            }
        }
    }
    if ($target < $total) {
        $html += '<a href="javascript:;" class="next" data-page="' + ($target + 1) + '">下一页</a>';
    }

    $html += '</div>';
    return $html;
});

//
Handlebars.registerHelper('cutText', function (longText) {
    var shortText = '',
        hiddenText = '';

    if (longText.length <= 140) {
        shortText = longText;
    } else {
        hiddenText = '<p class="hidden_text" css="display:none">' + longText + '</p>';
        shortText = '<p class="showing_text">' + longText.slice(0, 140) + '<a class="null">...</a></p>' + hiddenText;
    }

    return shortText;
});

//
Handlebars.registerHelper('cutIntro', function (longIntro) {
    if (longIntro) {
        return longIntro.length >= 15 ? (longIntro.substr(0, 12) + '...') : longIntro.substr(0, 15);
    } else {
        return '你可能感兴趣的用户';
    }
});

//
Handlebars.registerHelper('cutPhotos', function (photos) {
    var sources = '<input type="hidden" value="' + photos.toString() + '" />',
        location = window.location.pathname.split('/')[1] || 'index', src;

    if (sogoke.CDN === 'upyun') {
        src = (sogoke.MEDIA_PHOTO_URL || '/media/') + 'photos/' + photos[0] + '!home';
    } else if (sogoke.CDN === 's3') {
        src = (sogoke.MEDIA_PHOTO_URL || '/media/') + 'photos/midium/' + photos[0] + '.jpeg';
    } else {
    }

    if (location === 'index') {
        return '<div class="index_photos_preview_trigger" css="display:block;"><div class="my_dynamic_article_pic_chain"><img css="" src="' + src + '" width="120" class="index_photos_preview" alt="my_dynamic_article_pic"><!--NEED_REVISE_the_PATH--></div><div class="pic_number">' + photos.length + '张</div></div>';
    } else {
        return '<div class="photos_preview_trigger" css="display:block;"><div class="my_dynamic_article_pic_chain">' + sources + '<img css="" src="' + src + '" width="120" class="photos_preview" alt="my_dynamic_article_pic"><!--NEED_REVISE_the_PATH--></div><div class="pic_number">' + photos.length + '张</div></div>';
    }
});

Handlebars.registerHelper('showSharedIcon', function (is_shared) {
    if (is_shared) {
        return '<b></b>';
    }
    return '';
});
Handlebars.registerHelper('showSharedUserAvatar', function (is_shared, sharer_id, sharer_avatar) {
    if (is_shared) {
        var url = (sogoke.MEDIA_AVATAR_URL || '/media/') + 'user/' + sharer_id + '/' + sharer_avatar + '/avatar!small';
        return '<a href="/r/' + sharer_id + '/" class="tiny-avatar"  target="_blank"><img src="' + url + '" ></a>'
    }
    return '';
});


// Produce url according MODE
Handlebars.registerHelper('imgURL', function (size, suid) {
    if (suid && suid.slice(0, 4) == "http") {
        return suid;
    }
    if (sogoke.CDN === 'upyun') {
        return (sogoke.MEDIA_PHOTO_URL || '/media/') + 'photos/' + suid + '!' + size;
    } else if (sogoke.CDN === 's3') {
        return (sogoke.MEDIA_PHOTO_URL || '/media/') + 'photos/' + size + '/' + suid + '.jpeg';
    }
});

//
Handlebars.registerHelper('avatarURL', function (user_id, avatar, size) {
    var mediaURL = sogoke.MEDIA_AVATAR_URL || '/media/';

    return mediaURL + 'avatars/' + size + '/' + user_id + '.jpeg?v=' + avatar;
});

//
Handlebars.registerHelper('mediaURL', function () {
    return sogoke.MEDIA_URL || '/media/';
});

//
Handlebars.registerHelper('mediaAvatarURL', function (user_id, avatar, size) {
    if (sogoke.CDN === 'upyun') {
        return (sogoke.MEDIA_AVATAR_URL || '/media/') + 'user/' + user_id + '/' + avatar + '/avatar!' + size;
    } else if (sogoke.CDN === 's3') {
        return (sogoke.MEDIA_AVATAR_URL || '/media/') + 'avatars/' + size + '/' + user_id + '.jpeg?v=' + avatar;
    } else {
    }
});

//
Handlebars.registerHelper('mediaPhotoURL', function (suid, size) {
    if (sogoke.CDN === 'upyun') {
        var url = (sogoke.MEDIA_PHOTO_URL || '/media/') + 'photos/' + suid;
        if ($.type(size) === "string") {
            url += '!' + size;
        }
        return url;
    } else if (sogoke.CDN === 's3') {
        return (sogoke.MEDIA_PHOTO_URL || '/media/') + 'photos/' + size + '/' + suid + '.jpeg';
    }
});
//
Handlebars.registerHelper('staticURL', function () {
    return sogoke.STATIC_URL || '/static/';
});


Handlebars.registerHelper('site', function (url) {
    //https://gist.github.com/jlong/2428561
    var parser = document.createElement('a');
    parser.href = url;
    var site = parser.hostname;
    if (site.slice(0, 4) == "www.") {
        site = site.substring(4);
    }
    return site;
});

Handlebars.registerHelper('slice', function (context, block) {
    var ret = "",
        offset = parseInt(block.hash.offset) || 0,
        limit = parseInt(block.hash.limit) || 5,
        i = (offset < context.length) ? offset : 0,
        j = ((limit + offset) < context.length) ? (limit + offset) : context.length;

    for (i, j; i < j; i++) {
        ret += block.fn(context[i]);
    }

    return ret;
});

Handlebars.registerHelper('friendly_difficulty', function (v) {
    if (v == 1) {
        return '入门';
    } else if (v == 2 || v == 3) {
        return '进阶';
    } else {
        return '高级';
    }
});
Handlebars.registerHelper('difficulty_stars', function (num) {
    var len = 5;
    var stars = "";

    for (var i = 0; i < len; i++) {
        if (i < num) {
            stars += '<img src="img/feed-tutorial-star-active.png" alt=""/>';
        } else {
            stars += '<img src="img/feed-tutorial-star-disabled.png" alt=""/>';
        }
    }

    return new Handlebars.SafeString(stars);
});
Handlebars.registerHelper("starshow",function(value,size){
    size= size||'big';
    var h = ["<img src='star_" + size + "_empty.png'/>", "<img src='star_" + size + "_empty.png'/>", "<img src='star_" + size + "_empty.png'/>", "<img src='star_" + size + "_empty.png'/>", "<img src='star_" + size + "_empty.png'/>"];
    for (var i = 0; i < value; i++) {
        console.log("i="+i);
        console.log("value="+value);
        if( i + 1 >value){
            h[i] = "<img src='star_" + size + "_half.png'/>";
        }else{
            h[i] = "<img src='star_" + size + "_full.png'/>";
        }
    }
    return h.join('');//join() 方法用于把数组中的所有元素放入一个字符串。

});
Handlebars.registerHelper('friendly_spent', function (v) {
    if (v < 1) {
        return '1小时内';
    } else if (v <= 24) {
        return '1天内';
    } else if (v <= 24 * 7) {
        return '1周内';
    } else {
        return '超过1周';
    }

});

Handlebars.registerHelper('friendly_unit', function (v) {
    var units = {
        1: '厘米',
        2: '英寸',
        3: '米',
        4: '码',
        5: '尺',
        6: '加仑',
        7: '克',
        8: '公斤',
        9: '升',
        10: '毫升',
        11: '盎司',
        12: '汤匙',
        13: '茶匙',
        14: '杯'
    }
    return units[v];
});

Handlebars.registerHelper('friendly_index', function (v) {
    return {
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
        7: "七",
        8: "八",
        9: "九",
        10: "十",
        11: "十一",
        12: "十二",
        13: "十三",
        14: "十四",
        15: "十五",
        16: "十六",
        17: "十七",
        18: "十八",
        19: "十九",
        20: "二十"
    }[v];
});

Handlebars.registerHelper('friendly_filesize', function (v) {
    if (v < 1024) {
        return '1KB';
    } else if (v <= 1024 * 1024) {
        return parseInt(v / 1024) + 'KB';
    } else if (v <= 1024 * 1024 * 1024) {
        return parseInt(v / (1024 * 1024)) + 'MB';
    } else {
        return parseInt(v / (1024 * 1024 * 1024)) + 'GB';
    }
});

Handlebars.registerHelper('buzztype', function (photo, text) {
    var html = "";
    if (photo) {
        html = '<img src=' + Handlebars.helpers.imgURL("large", photo) + ' />';
    } else {
        html = '<div class="broadcast-details">' + Handlebars.helpers.shorten(text, 68) + '</div>';
    }
    return new Handlebars.SafeString(html);
});
