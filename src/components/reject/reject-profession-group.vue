<template>
    <div class='reject-group'>
        <span @click="showSelect(true)">
            <slot></slot>
        </span>
        <div class='model' v-show='show'></div>
        <div class='reject-profession' :class='{show:show}'>
            <div class='header'>
                <div class='close' @click="showSelect(false)"></div>
                拒保职业类别
            </div>
            <div class='flex'>
                <div class='left'>
                    <div v-for="(item,index) in jubaoData" :key='index'>
                        <div v-for="name in Object.keys(item)" :key='name' @click='action=name' class="broad-profession">
                            <div class='broad-item' :class="{action:action==name}">
                                {{name}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class='right'>
                    <div v-for="(item,index) in jubaoData" :key='index'>
                        <div class="main" v-for="(name,keys) in Object.keys(item)" :key='keys'>
                            <div class='classification-profession' v-show='name==action' v-for='(a,key1) in item[name]' :key='key1'>
                                <div v-for='(value,key) in a' :key='key'>
                                    <div class='item' @click='detail==key?detail="":detail=key'>
                                        <span :class="{'rotate':detail==key}">
                                            <img src="../../assets/image/right-icon.png" alt="">
                                        </span>
                                        {{key}}
                                    </div>
                                    <div class='details' v-if="detail==key">
                                        <div v-for='(i,k) in value' :key='k' class='detail'>
                                         
                                            {{i.job}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "rejectProfession",
        data() {
            return {
                show: false,
                action: "工程技术人员",
                detail: ""
            };
        },
        props: ["jubaoData"],
        created() {},
        methods: {
            showSelect(type) {
                this.show = type;
            },
        }
    };
</script>
<style scoped>
    .reject-group {
        display: inline;
    }
    
    .reject-group .model {
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.2);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 5;
    }
    
    .reject-group>span {
        display: inline;
        color: #73acff;
        font-size: 0.373333rem;
    }
    
    .reject-profession {
        height: 11.68rem;
        position: fixed;
        bottom: -100%;
        left: 0;
        z-index: 10;
        width: 100%;
        background: #fff;
        transition: all 0.3s;
    }
    
    .reject-profession.show {
        bottom: 0;
    }
    
    .header {
        border: 1px solid #ebebeb;
        font-size: 0.48rem;
        color: #333333;
        height: 1.333333rem;
        line-height: 1.333333rem;
        text-align: center;
        position: relative;
    }
    
    .close {
        position: absolute;
        left: 0.4rem;
        top: 50%;
        transform: translateY(-50%);
        width: 0.373333rem;
        height: 0.373333rem;
        background: url(../../assets/image/close-icon.png) no-repeat center center;
    }
    
    .flex {
        display: flex;
    }
    
    .left,
    .right {
        overflow-y: auto;
        overflow-x: hidden;
        height: 10.24rem;
    }
    
    .left {
        width: 31%;
    }
    
    .right {
        width: 69%;
        position: relative;
        font-size: 0.373333rem;
        color: #666666;
    }
    
    .broad-profession {
        text-align: center;
        background: #f5f5f5;
    }
    
    .broad-item {
        font-size: 0.373333rem;
        color: #666666;
        line-height: 0.533333rem;
        min-height: 1.6rem;
        padding: 0.266667rem 15%;
        border-bottom: 1px solid #ebebeb;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .broad-item.action {
        background: #fff url(../../assets/image/right-icon.png) no-repeat 96% center;
        background-size: 0.213333rem;
    }
    
    .item {
        padding: 0.266667rem 0.8rem;
        min-height: 1.6rem;
        line-height: .533333rem;
        border-bottom: 0.026667rem solid #ebebeb;
        position: relative;
        z-index: 2;
        background: #fff;
        display: flex;
        align-items: center;
    }
    
    .item>span {
        display: block;
        width: 0.213333rem;
        position: absolute;
        top: 50%;
        right: 0.266667rem;
        transform: translateY(-50%);
        transition: all 0.2s;
    }
    
    .item>span.rotate {
        transform: translateY(-50%) rotateZ(-90deg);
    }
    
    .item>span img {
        max-width: 100%;
    }
    
    .classification-profession .detail {
        color: #666;
        padding: 0.266667rem 0.693333rem;
        min-height: 1.6rem;
        line-height: 0.533333rem;
        background: #f9f9f9;
        border-bottom: 1px solid #ebebeb;
        display: flex;
        align-items: center;
    }
    
    .detail p {
        color: #198977;
        margin-bottom: 0.106667rem;
        position: relative;
    }
    
    .detail span {
        width: 0.16rem;
        height: 0.16rem;
        border-radius: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -0.346667rem;
        background: #198977;
    }
</style>