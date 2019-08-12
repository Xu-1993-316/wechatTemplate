<template>
  <div class="input-group">
    <label>{{ label }}</label>
    <div class="input-container">
      <input type="text" :value="value" v-resetInput @input="handleInput" :placeholder="placeholder" @focus="onFocus"
        @blur="onBlur" :class="{'dirty': selfDirty}">
      <div class="ps-container" v-if="selfDirty">
        <div class="ps" v-if="value && !validate.phone(value)">*手机号格式有误</div>
      </div>
    </div>
    <div class="send-btn" :class="{ 'lock': lock }" @click="handleClick">{{ smsTxt }}</div>
  </div>
</template>
<script>
    import {
        isAndroid
    } from "~helpers/env.js";
    import {
        validate
    } from "~helpers/validate.js";
    export default {
        data: function() {
            return {
                smsTxt: '发送验证码',
                lock: false,
                selfDirty: false,
                validate
            }
        },
        props: ['value', 'label', 'placeholder', 'dirty'],
        methods: {
            handleInput(evt) {
                var value = event.target.value;
                this.$emit('input', value);
            },
            handleClick() {
                if (this.lock) return;
                this.selfDirty = true;
                this.$emit('onSend', this.countDown);
            },
            countDown: function(_callback) {
                var t = 60,
                    _this = this;

                var run = function() {
                    _this.currentValue = _this.value;
                    _this.smsTxt = `${t}s`;

                    if (t >= 0) {
                        t--;
                        setTimeout(() => {
                            run();
                        }, 1000);
                    } else {
                        _this.lock = false;
                        _callback && _callback();
                        _this.smsTxt = "发送验证码";
                    }

                }

                _this.lock = true;
                run();
            },
            onFocus(evt) {
                if (isAndroid) {
                    setTimeout(() => {
                        evt.target.scrollIntoView();
                    }, 1000);
                }
            },
            onBlur() {
                this.selfDirty = true;
            },
        },
        watch: {
            'dirty': function(v) {
                if (v) {
                    this.selfDirty = true;
                }
            }
        }
    }
</script>
<style scoped>
    .input-group {
        position: relative;
        background-color: #fff;
        padding: .32rem 0 .266667rem;
        border-bottom: 1px solid #eee;
        clear: both;
        overflow: hidden;
        /* float: left; */
    }
    
    input {
        float: left;
        border: none;
        font-size: .373333rem;
        color: #333;
        outline: none;
        line-height: 22px;
        -webkit-user-select: auto;
        width: 3.733333rem;
    }
    
    label {
        float: left;
        font-size: .373333rem;
        color: #333333;
        margin-right: .266667rem;
        width: 1.866667rem;
        min-width: 60px;
    }
    
    .send-btn {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 2.586667rem;
        text-align: center;
        border-left: 1px solid #eee;
        padding: .32rem 0;
        font-size: .373333rem;
        color: #60A1FF;
    }
    
    .send-btn.lock {
        color: #777;
    }
    
    .input-container {
        position: relative;
        float: left;
        height: 100%;
    }
    
    .ps-container {
        position: absolute;
        font-size: .32rem;
        color: #FF0000;
        bottom: -.266667rem;
        /* transform: scale(.9); */
    }
    
    input.dirty::-webkit-input-placeholder {
        color: #ff0000;
    }
    
    input::-webkit-input-placeholder {
        color: #858585;
    }
</style>