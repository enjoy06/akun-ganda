const puppeteer = require('puppeteer');
const readline = require('readline');
const fs = require('fs');
const axios = require('axios');
const { getImageBase64, getCoverImageBase64 } = require('./tools/get_img');
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//const MAX_BROWSER = 10; // Maksimal 10 browser paralel

async function relogFB(cokis, index) {
    // Atur posisi window ke kanan berdasarkan index
    const windowX = 320 * index;
    // Tambahkan delay berdasarkan index agar tidak membuka browser bersamaan
    await new Promise(resolve => setTimeout(resolve, index * 5000)); // delay 1 detik per browser
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [
            `--window-size=300,450`,
            `--window-position=${windowX},0`
        ]
    });
    const page = await browser.newPage();

    // Extract email and password from cokis string
    const [email, password] = cokis.split('|');
    const onokGandaTah = fs.readFileSync(__dirname + '/tools/check_clone.js', 'utf-8');
    const dismiss = fs.readFileSync(__dirname + '/tools/dismiss.js', 'utf-8');
    const uploadScript = fs.readFileSync('./tools/upload_foto_clone.js', 'utf-8');

    try {
        const domain = '.facebook.com';
        await page.goto('https://facebook.com/');
        const cookies = parseCookie(cokis, domain);
        if (cookies.length > 0) {
            await page.browserContext().setCookie(...cookies);
            await page.reload({ waitUntil: 'networkidle2' });
        }
        await page.waitForSelector('#email', { timeout: 10000 });
        await page.type('#email', email);
        await page.type('#pass', password);
        await page.click('[name="login"]');
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
        await delay(5000); // Tunggu 5 detik untuk memastikan login selesai
        await page.evaluate(dismiss);
        await delay(15000); // Tunggu 15 detik untuk memastikan halaman dimuat

        // Get images for profile and cover
        console.log(`[${index + 1}][${email}] : Fetching images for profile and cover...`);
        var fotoProfil = await getImageBase64();
        var fotoSampul = await getCoverImageBase64();
        console.log(`[${index + 1}][${email}] : Images fetched successfully.`);
        await delay(7000); // Tunggu 7 detik sebelum menjalankan script upload

        //Upload sampul dan profil
        console.log(`[${index + 1}][${email}] : Uploading profile and cover photos...`);
        await page.evaluate(uploadScript + `
            startUploadSampul('${fotoSampul}'); // Ganti dengan data URI sampul
            startUploadProfiles('${fotoProfil}'); // Ganti dengan data URI profil
        `);
        await delay(15000); // Tunggu 15 detik untuk memastikan upload selesai
        console.log(`[${index + 1}][${email}] : Profile and cover photos uploaded successfully.`);
        await delay(7000); // Tunggu 7 detik sebelum menjalankan script lainnya

        // Jalankan script untuk memeriksa akun
        console.log(`[${index + 1}][${email}] : Running clone check script...`);
        const result = await page.evaluate(async () => {
            // check clone
            const asyncParams = require('getAsyncParams')('POST');
            const payload = {
                fb_api_req_friendly_name: 'CometProfileSwitcherListQuery',
                variables: '{"scale":2}',
                server_timestamps: true,
                doc_id: '9039782136148253',
                ...asyncParams
            };
            const headers = new Headers([['content-type','application/x-www-form-urlencoded']]);
            const res = await fetch('/api/graphql/', {
                method: 'POST',
                headers,
                body: new URLSearchParams(payload),
                credentials: 'same-origin'          // ← pastikan cookie ikut
            }).then(r => r.json());
            
            // Jika akun ganda sudah ada, cek apakah ada akun ganda yang sudah dibuat
            const hasClone = res?.data?.viewer?.actor?.profile_switcher_eligible_profiles?.nodes?.length > 0;
            if (hasClone) return 'Akun ganda sudah ada, silahkan gunakan akun tersebut';

            /* --- logic respon --- */
            const canCreate = res?.data?.viewer?.additional_profile_creation_eligibility?.single_owner?.can_create; 
            // Jika bisa membuat akun ganda, maka lanjutkan proses
            if (canCreate === true)  {
                // Akun ganda bisa dibuat
                console.log('Akun ganda bisa dibuat, silahkan tunggu...');
                    var uidku = require("CurrentUserInitialData").USER_ID;
                    var names = ["Lawrence", "Rogers", "Murphy", "Paty", "Lynne", "Roberson", "Tina", "Norman", "Mcbride", "Clara", "Joan", "Lula", "Charlene", "Welch", "June", "Jacquelyn", "Morrison", "Felicia", "Jacqueline", "Kathryn", "Jessica", "Carlson", "Samantha", "Obrien", "Love", "Chandler", "Joyce", "Russell", "Aguilar", "Maria", "Juana", "Jamie", "Emily", "Nelson", "Hazel", "Judith", "Ellen", "Celia", "Shannon", "Gilbert", "Patrick", "Santiago", "Brandy", "Lambert", "Blanche", "Martin", "Gutierrez", "Vega", "Reyes", "Sheri", "Palmer", "Wilma", "Mabel", "Gina", "Elliott", "Sherry", "Judy", "Heather", "Chavez", "Atkins", "Ramsey", "Massey", "Barnes", "Leona", "Dorothy", "Townsend", "Hale", "Beatrice", "Wendy", "Lucy", "Paula", "Phelps", "Boone", "Cannon", "Rodriquez", "Hicks", "Yvonne", "Nichols", "Ida", "Gayle", "Parker", "Gonzalez", "Poole", "Wise", "Flores", "Munoz", "Sherman", "Sarah", "Ball", "Lopez", "Johnston", "Joseph", "Long", "Morales", "Page", "Michele", "Freeman", "Buchanan", "Clayton", "Torres", "Alvarado", "Bernice", "Roxanne", "Castro", "Burns", "Anna", "Vanessa", "Jenkins", "Monique", "Foster", "Frank", "Dora", "Knight", "Joanna", "Terry", "Pierce", "Schultz", "Ruth", "Norris", "Clark", "Powers", "Jackie", "Tyler", "Elsie", "Alberta", "Moody", "Horton", "Holland", "Carole", "Blair", "Cummings", "Casey", "Tamara", "Wood", "Garcia", "Pearl", "Daisy", "Stanley", "Kristen", "Joy", "Walker", "Brock", "Rebecca", "Tonya", "Glenda", "Anita", "Irma", "Lowe", "Eleanor", "Sanchez", "Velma", "Kara", "Burnett", "Vargas", "Alison", "Christy", "Ryan", "Edwards", "Fitzgerald", "Evelyn", "Karla", "Warren", "Inez", "Shelley", "Norton", "Lydia", "Fields", "Bowman", "Robin", "Holt", "Craig", "Mathis", "Harmon", "Sanders", "Wilkerson", "Medina", "Curtis", "Yolanda", "Ward", "Smith", "Beck", "Huff", "Kelley", "Rhonda", "Natalie", "Brown", "Hubbard", "Edith", "Patton", "Hawkins", "Manning", "Pearson", "Summers", "Spencer", "Josephine", "Lori", "Mullins", "Iris", "Melanie", "Juanita", "Hogan", "Marsh", "Dolores", "Bass", "Beth", "Pitts", "Sherri", "Geneva", "Toni", "Rivera", "Mae", "Lillian", "Holmes", "Vicky", "Stacy", "Steele", "Harriet", "Debbie", "Mcdonald", "Doyle", "Lauren", "Patty", "Rios", "Arlene", "Tammy", "Denise", "Doris", "Conley", "Bridges", "Todd", "Pratt", "Lucas", "Fuller", "Penny", "Lynda", "Richards", "Carol", "Robinson", "Lindsay", "Gertrude", "Angelica", "Christine", "Renee", "Nancy", "Kelly", "Marian", "Franklin", "Gray", "Haynes", "Delgado", "Leonard", "Annie", "Payne", "Hansen", "Watts", "Matthews", "Harper", "Donna", "Jimenez", "Mann", "Myra", "Vickie", "Ramos", "Shirley", "Wright", "Hall", "Faye", "Viola", "Agnes", "Marcia", "Billie", "Logan", "Reeves", "Sara", "Jordan", "Jensen", "Greer", "Margaret", "April", "Cruz", "Valdez", "Elaine", "Singleton", "Alvarez", "Stone", "Bowen", "Miller", "Bessie", "Sonia", "Butler", "Laurie", "Henderson", "Isabel", "Mcgee", "Kathy", "Carr", "Erin", "Mclaughlin", "Pena", "Hernandez", "Pamela", "Diana", "Alicia", "Moss", "Osborne", "Eileen", "Amber", "Malone", "Rhodes", "Jean", "Gloria", "Beverly", "Phyllis", "Mason", "Thelma", "Powell", "Marie", "Ford", "Gomez", "Lynch", "Robbins", "Tate", "Nora", "Olivia", "Krista", "Walsh", "Patsy", "Wong", "Gardner", "Sonya", "Violet", "Teresa", "Kelli", "Ballard", "Lillie", "Naomi", "Cohen", "Leticia", "Jan", "Monica", "Luz", "Georgia", "Peggy", "Dianne", "Grant", "Greene", "Anne", "Briggs", "Richardson", "Griffin", "Fisher", "Alma", "Adrienne", "Moreno", "Kristi", "Katherine", "Sheryl", "Cathy", "Roberta", "Morris", "Caroline", "Holloway", "Padilla", "Wolfe", "Natasha", "Marshall", "Colon", "Emma", "Terri", "Cora", "Potter", "Tucker", "Cole", "Helen", "Allison", "Sheila", "Jeannette", "Burton", "Barton", "Irene", "Bryant", "Bertha", "Antoinette", "Garza", "Pauline", "Julie", "Reynolds", "Margarita", "Simon", "Theresa", "Genevieve", "Thomas", "Wheeler", "Connie", "Walters", "Shelia", "Collier", "Harris", "Bush", "Melissa", "Willie", "Wanda", "Byrd", "Janice", "Hannah", "Santos", "Fannie", "Katrina", "Stevens", "Stephens", "Beulah", "Berry", "Melody", "Guzman", "Miles", "Tiffany", "Francis", "Angie", "Shelly", "Mcguire", "Jennifer", "Maryann", "Anderson", "Virginia", "Richard", "Glover", "Louise", "Walton", "Mcdaniel", "Meyer", "Sutton", "Ramirez", "Hudson", "Evans", "Kimberly", "Colleen", "Schneider", "Waters", "Jeanette", "Mendoza", "Flora", "Candice", "Katie", "Miriam", "Daniels", "Sandra", "Verna", "Arnold", "Della", "Dawson", "Misty", "Davidson", "Gail", "Gates", "Williamson", "Marquez", "Brooke", "Reese", "Diane", "Dixon", "Gonzales", "Dunn", "Cheryl", "Loretta", "Erica", "Geraldine", "Delores", "Melinda", "Constance", "Tracey", "Susie", "Heidi", "Weaver", "Kristine", "Carpenter", "Bennett", "Becky", "Moore", "Barbara", "Henry", "Suzanne", "Jenny", "Erickson", "Maldonado", "Morton", "Figueroa", "Barnett", "Oliver", "Wells", "Cox", "Bradley", "Michelle", "Darlene", "Deanna", "Hattie", "Mendez", "Goodwin", "Holly", "Maggie", "Ethel", "Grace", "Murray", "Douglas", "Cook", "Hilda", "Sandy", "Nellie", "Day", "Andrea", "Cross", "Abbott", "Veronica", "Ashley", "Roy", "Mills", "Frances", "Wade", "Claudia", "Minnie", "Joann", "Patterson", "Mary", "Benson", "Lyons", "Perkins", "Nunez", "Hopkins", "Rosemary", "Janie", "Gibbs", "Barrett", "Molly", "Mckenzie", "Wilson", "Sharon", "Cobb", "Armstrong", "Priscilla", "Regina", "Jodi", "Bernadette", "Reed", "Phillips", "Martinez", "Candace", "Myers", "Eunice", "Patricia", "Jessie", "Quinn", "Crystal", "Brady", "Snyder", "Mccarthy", "Riley", "Woods", "Saunders", "Sparks", "Kathleen", "Stewart", "Wagner", "Brenda", "Lloyd", "Lois", "Nash", "Dean", "Jill", "Moran", "Hunter", "Baldwin", "Vicki", "Watkins", "Cooper", "Carla", "Sally", "Megan", "Kayla", "Victoria", "Vasquez", "Rodriguez", "Perry", "Ingram", "Kristin", "Ana", "Reid", "Marjorie", "Lane", "Sims", "Ferguson", "Susan", "George", "Cecilia", "Hunt", "Linda", "Mattie", "Gibson", "Lewis", "Brittany", "Dennis", "Simpson", "Bates", "Drake", "Bobbie", "Schmidt", "Claire", "Margie", "Pope", "Erma", "Klein", "Courtney", "Rosa", "Guerrero", "Hammond", "Gwendolyn", "Chambers", "Nina", "Audrey", "Coleman", "Turner", "Tracy", "Adkins", "Alice", "Johnnie", "Park", "Leslie", "Karen", "Garrett", "Salazar", "Ruiz", "Ellis", "Kristina", "Estrada", "Collins", "Marion", "Castillo", "Swanson", "Howard", "Wilcox", "Watson", "Peterson", "Neal", "Laura", "Rodgers", "Tanya", "Harrington", "Lola", "Olga", "Hampton", "Jane", "Lorraine", "Maxine", "Herrera", "Lisa", "Joanne", "Boyd", "Kennedy", "Jennings", "Bryan", "Morgan", "Caldwell", "Mack", "Yates", "Eva", "Christensen", "Vivian", "Gladys", "Ella", "Campbell", "Ada", "Betty", "Ruby", "Nicole", "Chase", "Newton", "Bell", "Danielle", "Stephanie", "Banks", "Lynn", "Hill", "Griffith", "Mamie", "Brooks", "Gregory", "Florence", "Duncan", "Fletcher", "Valerie", "Adams", "Farmer", "Thornton", "Amelia", "Parks", "Hayes", "Owen", "Carmen", "Whitney", "Carrie", "May", "Stella", "Pittman", "Diaz", "Peters", "Floyd", "Higgins", "Paul", "Yvette", "Cochran", "Chapman", "Lindsey", "Parsons", "Houston", "Cynthia", "Goodman", "Rachel", "Marsha", "Bridget", "Sharp", "Amanda", "Vaughn", "Johnson", "Lena", "Stacey", "Hood", "Ross", "Hamilton", "Rosie", "Daniel", "Kim", "Hardy", "Esther", "Annette", "Janet", "Erika", "Hanson", "Charlotte", "Ramona", "Sadie", "Graves", "Wilkins", "Bishop", "Marianne", "Cassandra", "Debra", "Myrtle", "Opal", "Allen", "Tran", "Guadalupe", "Marlene", "Bowers", "Madeline", "Jeanne", "Amy", "Elizabeth", "Barber", "Ortega", "Belinda", "Sylvia", "Cain", "Carter", "Shaw", "Rowe", "Carroll", "Carolyn", "Lamb", "Cindy", "Rose", "Dawn", "Martha", "Brandi", "Edna", "Willis", "Norma", "Jacobs", "Clay", "Weber", "Fox", "Olson", "Lee", "Leah", "Mildred", "Fernandez", "Curry", "Nguyen", "Simmons", "Jackson", "Latoya", "Lucille", "Bailey", "Rosalie", "Alexander", "Dana", "Lawson", "Perez", "Maureen", "Sabrina", "Pam", "Owens", "Blanca", "Keller", "Stevenson", "Jones", "Wallace"];
                    var a = Math.floor(Math.random() * names.length);
                    var b = Math.floor(Math.random() * names.length);
                    var jvars = JSON.stringify({
                        "input": {
                            "name": names[a],
                            "source": "PROFILE_SWITCHER_UNIFIED_CREATION",
                            "user_name": names[a] + "." + ngarangNomer(6),
                            "cover_photo": {
                                "existing_cover_photo_id": sessionStorage.foto_sampul_gw,
                                "focus": {
                                    "x": 0.5,
                                    "y": 0.5000720149791156
                                }
                            },
                            "profile_photo": {
                                "existing_photo_id": sessionStorage.foto_profil_gw
                            },
                            "actor_id": uidku,
                            "client_mutation_id": "2"
                        }
                    });
                    const data_payloads = {
                        'fb_api_req_friendly_name': 'AdditionalProfileCreateMutation',
                        'variables': jvars,
                        'server_timestamps': true,
                        'doc_id': '4699419010168408',
                        ...require('getAsyncParams')('POST')
                    };
                    const requestOptions = {
                        headers,
                        method: "POST",
                        body: new URLSearchParams(data_payloads)
                    };
                    fetch("/api/graphql/", requestOptions).then(async (r) => {
                        var d = await r.json();
                        if (d.data.additional_profile_create.additional_profile.id) {
                            //console.log(`[${index + 1}][${email}] : Akun ganda berhasil dibuat!`);
                            //console.log(`[${index + 1}][${email}] : ID Akun Ganda: ${d.data.additional_profile_create.additional_profile.id}`);
                            return `Sukses ${d.data.additional_profile_create.additional_profile.id}`;
                        } else {
                            return 'gagal create ganda';
                        }
                    });

                function ngarangNomer(length) {
                            var result = '';
                            var characters = '0123456789';
                            var charactersLength = characters.length;
                            for (var i = 0; i < length; i++) {
                                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                            }
                            return result;
                }
            }
            
            // Jika akun ganda tidak bisa dibuat, simpan statusnya
            if (canCreate === false) {
                // Akun ganda tidak bisa dibuat
                return 'fitur akun ganda belum tersedia';
            }

            //return 'Status tidak ter‑detect';
        });
        console.log(`[${index+1}][${email}] : ${result}`);
        await delay(2000); // Tunggu 2 detik sebelum melanjutkan
        if (result === 'fitur akun ganda belum tersedia') {
            //console.log(`[${index + 1}][${email}] : Akun ganda tidak bisa dibuat, silahkan coba lagi nanti.`);
            //save cokis!
            const cookies = await page.browserContext().cookies();
            const targetNames = ['c_user', 'xs', 'fr', 'datr', 'sb', 'wd', 'spin', 'presence', 'act', 'locale'];
            const sessionCookies = cookies.filter(c => targetNames.includes(c.name));
            if (sessionCookies.length >= 3) {
                const cookieString = sessionCookies.map(c => `${c.name}=${c.value}`).join('; ');
                const res = await axios.get(`https://graph.facebook.com/${email}/picture?type=normal`, { maxRedirects: 0, validateStatus: null });
                const href = res.headers.location || res.request?.res?.headers?.location || res?.request?.responseURL;
                if (href && href.includes("C5yt7Cqf3zU")) {
                    console.error(`[×][${email}] : Checkpoint!`);
                } else {
                    console.log(`[✓][${email}] : LIVE!`);
                    fs.appendFileSync(`durong-ganda.txt`, `${email}|${password}| ;${cookieString};\n`);
                    console.log(`[✓][${email}] : FB saved !`);
                }
            } else {
                console.warn('[!] Tidak semua cookies ditemukan:', targetNames);
            }
            await delay(5000); // Tunggu 5 detik sebelum menutup browser
            await browser.close();
        } else if (result === 'gagal create ganda') {
            //console.log(`[${index + 1}][${email}] : Akun ganda gagal dibuat.`);
            //save cokis!
            const cookies = await page.browserContext().cookies();
            const targetNames = ['c_user', 'xs', 'fr', 'datr', 'sb', 'wd', 'spin', 'presence', 'act', 'locale'];
            const sessionCookies = cookies.filter(c => targetNames.includes(c.name));
            if (sessionCookies.length >= 3) {
                const cookieString = sessionCookies.map(c => `${c.name}=${c.value}`).join('; ');
                const res = await axios.get(`https://graph.facebook.com/${email}/picture?type=normal`, { maxRedirects: 0, validateStatus: null });
                const href = res.headers.location || res.request?.res?.headers?.location || res?.request?.responseURL;
                if (href && href.includes("C5yt7Cqf3zU")) {
                    console.error(`[×][${email}] : Checkpoint!`);
                } else {
                    console.log(`[✓][${email}] : LIVE!`);
                    fs.appendFileSync(`gagal-ganda.txt`, `${email}|${password}| ;${cookieString};\n`);
                    console.log(`[✓][${email}] : FB saved !`);
                }
            } else {
                console.warn('[!] Tidak semua cookies ditemukan:', targetNames);
            }
            await delay(5000); // Tunggu 5 detik sebelum menutup browser
            await browser.close();
        } else if (result === 'Akun ganda sudah ada, silahkan gunakan akun tersebut') {
            //console.log(`[${index + 1}][${email}] : Akun ganda sudah ada, silahkan gunakan akun tersebut.`);
            //save cokis!
            const cookies = await page.browserContext().cookies();
            const targetNames = ['c_user', 'xs', 'fr', 'datr', 'sb', 'wd', 'spin', 'presence', 'act', 'locale'];
            const sessionCookies = cookies.filter(c => targetNames.includes(c.name));
            if (sessionCookies.length >= 3) {
                const cookieString = sessionCookies.map(c => `${c.name}=${c.value}`).join('; ');
                const res = await axios.get(`https://graph.facebook.com/${email}/picture?type=normal`, { maxRedirects: 0, validateStatus: null });
                const href = res.headers.location || res.request?.res?.headers?.location || res?.request?.responseURL;
                if (href && href.includes("C5yt7Cqf3zU")) {
                    console.error(`[×][${email}] : Checkpoint!`);
                } else {
                    console.log(`[✓][${email}] : LIVE!`);
                    fs.appendFileSync(`wesono-ganda.txt`, `${email}|${password}| ;${cookieString};\n`);
                    console.log(`[✓][${email}] : FB saved !`);
                }
            } else {
                console.warn('[!] Tidak semua cookies ditemukan:', targetNames);
            }
            await delay(5000); // Tunggu 5 detik sebelum menutup browser
            await browser.close();
        } else if (result.startsWith('Sukses')) {
            //console.log(`[${index + 1}][${email}] : Akun ganda sudah ada, tidak perlu membuat baru.`);
            //save cokis!
            const cookies = await page.browserContext().cookies();
            const targetNames = ['c_user', 'xs', 'fr', 'datr', 'sb', 'wd', 'spin', 'presence', 'act', 'locale'];
            const sessionCookies = cookies.filter(c => targetNames.includes(c.name));
            if (sessionCookies.length >= 3) {
                const cookieString = sessionCookies.map(c => `${c.name}=${c.value}`).join('; ');
                const res = await axios.get(`https://graph.facebook.com/${email}/picture?type=normal`, { maxRedirects: 0, validateStatus: null });
                const href = res.headers.location || res.request?.res?.headers?.location || res?.request?.responseURL;
                if (href && href.includes("C5yt7Cqf3zU")) {
                    console.error(`[×][${email}] : Checkpoint!`);
                } else {
                    console.log(`[✓][${email}] : LIVE!`);
                    fs.appendFileSync(`sukses-ganda.txt`, `${email}|${password}| ;${cookieString}; ${result.split(' ')[1] ? 'UID ganda: ' + result.split(' ')[1] : ''}\n`);
                    console.log(`[✓][${email}] : FB saved !`);
                }
            } else {
                console.warn('[!] Tidak semua cookies ditemukan:', targetNames);
            }
            await delay(5000); // Tunggu 5 detik sebelum menutup browser
            await browser.close();
            return;
        }
        
        // else {
        //     // Jika status tidak terdeteksi, simpan sebagai error
        //     console.error(`[${index + 1}][${email}] : Status tidak terdeteksi, simpan sebagai error.`);
        //     //error cokis!
        //     const cookies = await page.browserContext().cookies();
        //     const targetNames = ['c_user', 'xs', 'fr', 'datr', 'sb', 'wd', 'spin', 'presence', 'act', 'locale'];
        //     const sessionCookies = cookies.filter(c => targetNames.includes(c.name));
        //     if (sessionCookies.length >= 3) {
        //         const cookieString = sessionCookies.map(c => `${c.name}=${c.value}`).join('; ');
        //         const res = await axios.get(`https://graph.facebook.com/${email}/picture?type=normal`, { maxRedirects: 0, validateStatus: null });
        //         const href = res.headers.location || res.request?.res?.headers?.location || res?.request?.responseURL;
        //         if (href && href.includes("C5yt7Cqf3zU")) {
        //             console.error(`[×][${email}] : Checkpoint!`);
        //         } else {
        //             console.log(`[✓][${email}] : LIVE!`);
        //             fs.appendFileSync(`error-akun.txt`, `${email}|${password}| ;${cookieString};\n`);
        //             console.log(`[✓][${email}] : FB saved !`);
        //         }
        //     } else {
        //         console.warn('[!] Tidak semua cookies ditemukan:', targetNames);
        //     }
        //     await delay(5000); // Tunggu 5 detik sebelum menutup browser
        //     await browser.close(); 
        //     return;
        // }
        //console.log(`[${index + 1}][${email}] Clone check script executed successfully.`);

    } catch (e) {
        //console.error('[×] Puppeteer Error:', e.message);
    }
    
};

const parseCookie = (cookieStr, domain) => {
    return cookieStr
        .split(';')
        .map(cookie => {
            const [name, ...rest] = cookie.trim().split('=');
            const value = rest.join('=');
            return {
                name,
                value,
                domain,
                path: '/',
            };
        })
        .filter(cookie => ['sb', 'datr'].includes(cookie.name));
};

(async () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const MAX_BROWSER = await new Promise(resolve => {
        rl.question('Masukkan jumlah browser paralel (MAX_BROWSER): ', answer => {
            rl.close();
            resolve(Number(answer) || 1);
        });
    });

    const lines = fs.readFileSync('akun.txt', 'utf-8').split('\n').filter(Boolean);
    let idx = 0;
    while (idx < lines.length) {
        // Ambil batch sebanyak MAX_BROWSER
        const batch = lines.slice(idx, idx + MAX_BROWSER);
        await Promise.all(
            batch.map((line, i) => relogFB(line.trim(), i))
        );
        idx += MAX_BROWSER;
        // Delay antar batch jika ingin (misal 2 detik)
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
})();
