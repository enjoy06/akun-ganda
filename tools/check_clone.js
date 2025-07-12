const myHeaders = new Headers();
myHeaders.append('content-type','application/x-www-form-urlencoded');
const data_payloads = {
    'fb_api_req_friendly_name': 'CometProfileSwitcherListQuery',
    'variables': '{"scale":2}',
    'server_timestamps': true,
    'doc_id': '9039782136148253',
    ...require('getAsyncParams')('POST')
};
const requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: new URLSearchParams(data_payloads)
};
return new Promise(resolve => {
    fetch("/api/graphql/", requestOptions).then(async(a)=>{
        var b = await a.json();
        if (b.data.viewer.additional_profile_creation_eligibility.single_owner.can_create === true){
            setTimeout(() => {
                resolve("Akun ganda bisa dibuat, silahkan tunggu...");
                if (sessionStorage.foto_sampul_gw && sessionStorage.foto_profil_gw) {
                    createClone();
                    resolve("Akun ganda berhasil dibuat!");
                }
            }, 5000);
        } else if (b.data.viewer.additional_profile_creation_eligibility.single_owner.can_create === false){
            resolve("Tidak bisa membuat akun ganda, silahkan coba lagi nanti");
        } else if (b.data.viewer.actor.profile_switcher_eligible_profiles.nodes.length > 0) {
            resolve("Akun ganda sudah ada, silahkan gunakan akun tersebut");
        }
    });
});

function createClone(){
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
    const myHeaders = new Headers();
    myHeaders.append('content-type','application/x-www-form-urlencoded');
    const data_payloads = {
        'fb_api_req_friendly_name': 'AdditionalProfileCreateMutation',
        'variables': jvars,
        'server_timestamps': true,
        'doc_id': '4699419010168408',
        ...require('getAsyncParams')('POST')
    };
    const requestOptions = {
        headers: myHeaders,
        method: "POST",
        body: new URLSearchParams(data_payloads)
    };
    return new Promise(resolve => {
        fetch("/api/graphql/", requestOptions).then(async (r) => {
            var d = await r.json();
            if (d.data.additional_profile_create.additional_profile.id) {
                resolve("Akun ganda berhasil dibuat!");
            } else {
                resolve("Error saat membuat akun ganda: " + d.errors[0].message);
            }
        });
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

function startpost(fbid,kata){
    var uidku = require("CurrentUserInitialData").USER_ID;
    var jsV = JSON.stringify({"input":{"composer_entry_point":"inline_composer","composer_source_surface":"timeline","idempotence_token":hexc(8)+"-"+hexc(4)+"-"+hexc(4)+"-"+hexc(4)+"-"+hexc(12)+"_FEED","source":"WWW","attachments":[],"audience":{"privacy":{"allow":[],"base_state":"EVERYONE","deny":[],"tag_expansion_state":"UNSPECIFIED"}},"message":{"ranges":[],"text":kata},"with_tags_ids":null,"inline_activities":[],"text_format_preset_id":"0","publishing_flow":{"supported_flows":["ASYNC_SILENT","ASYNC_NOTIF","FALLBACK"]},"logging":{"composer_session_id":hexc(8)+"-"+hexc(4)+"-"+hexc(4)+"-"+hexc(4)+"-"+hexc(12)},"navigation_data":{"attribution_id_v2":"ProfileCometTimelineListViewRoot.react,comet.profile.timeline.list,unexpected,1734667527262,41441,190055527696468,,;FriendingCometFriendRequestsRoot.react,comet.friending.friendrequests,unexpected,1734667510763,494914,2356318349,,;FriendingCometRoot.react,comet.friending,tap_tabbar,1734667509478,938444,2356318349,,"},"tracking":[null],"event_share_metadata":{"surface":"timeline"},"actor_id":uidku,"client_mutation_id":"8"},"feedLocation":"TIMELINE","feedbackSource":0,"focusCommentID":null,"gridMediaWidth":230,"groupID":null,"scale":1,"privacySelectorRenderLocation":"COMET_STREAM","checkPhotosToReelsUpsellEligibility":true,"renderLocation":"timeline","useDefaultActor":false,"inviteShortLinkKey":null,"isFeed":false,"isFundraiser":false,"isFunFactPost":false,"isGroup":false,"isEvent":false,"isTimeline":true,"isSocialLearning":false,"isPageNewsFeed":false,"isProfileReviews":false,"isWorkSharedDraft":false,"hashtag":null,"canUserManageOffers":false,"__relay_internal__pv__CometUFIShareActionMigrationrelayprovider":true,"__relay_internal__pv__GHLShouldChangeSponsoredDataFieldNamerelayprovider":false,"__relay_internal__pv__GHLShouldChangeAdIdFieldNamerelayprovider":false,"__relay_internal__pv__IsWorkUserrelayprovider":false,"__relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider":false,"__relay_internal__pv__CometFeedStoryDynamicResolutionPhotoAttachmentRenderer_experimentWidthrelayprovider":500,"__relay_internal__pv__CometImmersivePhotoCanUserDisable3DMotionrelayprovider":false,"__relay_internal__pv__IsMergQAPollsrelayprovider":false,"__relay_internal__pv__FBReelsMediaFooter_comet_enable_reels_ads_gkrelayprovider":false,"__relay_internal__pv__StoriesArmadilloReplyEnabledrelayprovider":false,"__relay_internal__pv__EventCometCardImage_prefetchEventImagerelayprovider":true,"__relay_internal__pv__GHLShouldChangeSponsoredAuctionDistanceFieldNamerelayprovider":false});
    const dataQuery = {
      'variables': jsV,
      'doc_id': '9797715060256360',
      ...require('getAsyncParams')('POST')
    };
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let a = xhr.responseText;
            var data = JSON.parse(a.replace('for (;;);',''));
            console.log(data);
            if(data.data.story_create.story.url){
              //window.open(data.data.story_create.story.url,"_self");
              console.log("Post Berhasil");
            }
        }
    };
    xhr.open("POST", "/api/graphql/");
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.send(new URLSearchParams(dataQuery));
}

const hexc = size => {
    let result = [];
    let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  
    for (let n = 0; n < size; n++) {
      result.push(hexRef[Math.floor(Math.random() * 16)]);
    }
    return result.join('');
  }