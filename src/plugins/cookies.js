const Cookies = {
    setCookie: function (key, value, hours) {
        try {
            var now = new Date();
            var time = now.getTime();
            time += hours * 3600 * 1000;
            now.setTime(time);
            document.cookie = `${key}=${value}; expires=' + ${now.toString()}; path=/`
        } catch (e) {
            console.log(`cannot set cookie for key ${key} with value ${value} due to error ${e}`)
        }
    },
    getCookies: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
}
export default Cookies