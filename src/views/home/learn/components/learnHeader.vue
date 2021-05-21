<template>
    <div id="main_practice_header" class="top_tab">
        <div class="goback">
            <div class="goback_origin">返回</div>
        </div>
        <div class="level_detail current_practice">
            <div class="level_num">
                <span class="level_index">3</span>
            </div>
            <div title="让数据会说话" class="level_name">
                第3关 让数据会说话
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "learnHeader"
    }
</script>

<style scoped>
    /*头部样式*/
    .goback, .top_tab {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .top_tab {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 10;
        background-color: #0a080f;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        width: 100%;
        height: 6vh;
        font-size: .8vw;
        font-weight: 400;
        font-stretch: normal;
        letter-spacing: .04vw;
        color: #fff;
    }

    .goback {
        cursor: pointer;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        position: absolute;
        left: 1.19vw;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        background: url(//cdn.pyhot.cn/app/program/resource/cdn/back_icon.6bc9fbf437f224ddce92c8c5474dcb22.png);
        background-size: cover;
        background-repeat: no-repeat;
        width: 3.5vw;
        height: 2.05vw;
    }

    .goback_origin {
        position: relative;
        left: 4vw;
        word-break: keep-all;
        color: #fff;
        font-size: 1vw;
        line-height: 1;
    }



    .level_detail {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: relative;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        margin-right: .85vw;
        background: url(//cdn.pyhot.cn/app/program/resource/cdn/top_level_name_active.9d0269ed561abf260d460f7c621e9fd3.png);
        background-size: 100% 70%;
        background-position-y: 70%;
        background-repeat: no-repeat;
        height: 6vh;
        cursor: pointer;
        padding-left: 2vw;
        padding-right: 2vw;
    }

    .level_num {
        margin-top: .6vh;
        text-align: center;
        line-height: 1.24vw;
        z-index: 1;
        width: 1.71vw;
        height: 1.62vw;
        opacity: .8;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .level_index, .level_index_lock {
        font-size: 1.02vw;
        line-height: 1.62vw;
        color: #484750;
        width: 1.49vw;
        height: 1.3vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .level_index {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABPCAYAAABrs9IqAAAEhElEQVR4nO2dXYgVZRjHf3tUCpFF+gAjEkSEpQ8IIghBEAQjAkXILoK8UJC8sI9N3XZlkTKs9sMP1ghCiggSRBCEbqII+gDBBEOCoCJSpAW7iChZ0dwuHs9ydpozM+/7Pu+M85z53SxzzrzPPPNjd89/z5l5tu/G93uJQB/wDbA6RvGInEF6ntUu3NIueItnqZ9kgCeA52IUjiH6TmAsQt2yeAtYrF00huhXgeUR6pbFA8Au7aLaou8DXlOuWQVDwP2aBbVFHwCWKNesgsXIuaihKfoxYItivap5Hnhcq5im6EPK9aqmDzh862swWmKeAdYo1bqdWI1E1WA0RNc9zuUxhpxjEBqiXwZWKNS5XVmOQtwLFb0MGA5togYMIdHVm1DR+4H+wBp1YAmBcS9E9KPA1pCD14wtSIT1IkS0tTiXRws5Z+/FPmwC1voetMasATb7LPQRfQcw7nMwI7yDR9zzEb0TWOmxzgorkEjrhKvoe4FR14MYZBiJtoVxFf0mvRHn8uhHom1hXEQ/Amxzasc2W5GIWwgX0YeABc7t2MUp7hUVvQFY59WObdYiUTeXIqIXARMh3RhnHIm8mRQRvRNYFdyOXVYijjLJE30PTZwrwigSfbuSJ/p1YKlaO3bpR6JvV7JEPwRsV23HNtuQCJxKluiDwEL1duyygIy4103008D6KO3YZh2wMe2JNNFNnAtjHHE4jzTRO4CB6O3YZRUpcS8p+m5gXynt2GYUicZzJEXvA+4qrR27LEWi8RydogeQXxsNOmwHHm5vdIpu4pwuC4HJ9kZb9JPAU5W0Y5v1SFSmhZg/WGk7tpkAFrWAF4AHK27GMgPAjhbwYtWd9AAvtYCjVXfRA7zbAt4Dfqy6E8P8BEy1gOtEuN2rYY5dwPV2vPsU+KzCZqzyBXAa5v/BMgjcqKQdm/wLvNLe6BT9A/B+6e3Y5Rhwob2R9qbSn6W2Y5O/SHyonRT9B/BGae3YZT9wpfOBtDf+jyKRpMGPX4Cp5INpopu4F8Zu4FrywW4fzp4GPo/ajk2+BE6lPZF1ucEgElEainETcZZKlugLSERpKMYHwPluT+ZdEjaKRJWGbP4X55Lkib6C4y0EPcoBYDprhyKX7U4BP6u0Y5NfgSN5OxURfQ3YE9yOXfYAM3k7Fb214hQSXRrm8zVwssiOLjcLNXFvPjfpeHcuDxfR54EPnduxy0fAuaI7u97Q2cQ94W/Aaairq+hplOfB1ZS3gd9dFvjcdH8EiTS9ym90XOpVFB/RM/R23BuiQJxL4jsY5STwlefaOvMtcMJnYcionkEk4vQKs0ic8xriHSL6HBJxeoWPgbO+i0OHT40gUcc6/yDn6k2o6Gkk6lhnDLgcUkBjnNokEnmschGF2wE1RM8gkccqw8DV0CJaAwJPINHHGmeA4xqFtETPIiPK1P9/SYUExbkkmiMvv0MikBU+Qb6jVdCeLTqCRKG6cxXlcc3aoi8jIyXrzgRwSbNgjGm5k0gkqitRvlliiFb/sSuZERTiXJJY85+Po/hCUiJnifSC/h8m+KLrnsYCGQAAAABJRU5ErkJggg==);
        background-size: cover;
        background-repeat: no-repeat;
    }

    .level_name {
        margin-top: .5vh;
        margin-left: .6vw;
        z-index: 1;
        color: #e7e7ea;
        opacity: .7;
        font-size: 1.02vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>