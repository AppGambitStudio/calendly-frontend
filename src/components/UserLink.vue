<template>
    <div class="content">
        <div class="block">
            <div class="field is-grouped">
                <div class="control is-expanded">
                    <input class="input" type="text" placeholder="Unique link">
                </div>
                <div class="control">
                    <button class="button is-primary">Save Link</button>
                </div>
            </div>                
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserLink',
    data() {
        return {
            link: ''
        }
    }
}
</script>
