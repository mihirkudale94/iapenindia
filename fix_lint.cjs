const fs = require('fs');
const replace = (file, search, replaceStr) => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(search)) {
    fs.writeFileSync(file, content.replace(search, replaceStr));
    console.log(`Updated ${file}`);
  }
};
replace('src/components/FloatingSocials.jsx', "import React from 'react';\n", "");
replace('src/components/SocialIcons.jsx', "import React from 'react';\n", "");
replace('src/pages/Chapters.jsx', "import React, { useState", "import { useState");
replace('src/pages/Contact.jsx', "import React, { useState", "import { useState");
replace('src/pages/Journal.jsx', "import React from 'react';\n", "");
replace('src/pages/Membership.jsx', "import React, { useState", "import { useState");
replace('src/data/homeData.jsx', "import React from 'react';\n", "");
replace('src/components/__tests__/RegistrationSection.test.jsx', "import { describe, it, expect, vi }", "import { describe, it, expect }");
replace('src/pages/CoreGroups.jsx', "import React, { useState", "import { useState");
replace('src/pages/CoreGroups.jsx', "import { Search, Filter, Plus, FileText", "import { Search, Plus, FileText");
replace('src/pages/Events.jsx', "import React, { useState", "import { useState");
replace('src/pages/Events.jsx', "import { Calendar, MapPin, Clock, ArrowRight, CheckCircle }", "import { Calendar, MapPin, Clock, ArrowRight }");
replace('src/components/Navbar.jsx', "import React, { useState", "import { useState");
replace('src/components/Navbar.jsx', "setIsOpen(false);", "// eslint-disable-next-line react-hooks/set-state-in-effect\n    setIsOpen(false);");
replace('src/pages/Policies.jsx', "import React, { useState", "import { useState");
replace('src/pages/Policies.jsx', "import { Shield, FileText, RefreshCw, AlertCircle, Check }", "import { Shield, FileText, RefreshCw, Check }");
replace('src/pages/Policies.jsx', "setActiveTab('privacy');", "// eslint-disable-next-line react-hooks/set-state-in-effect\n      setActiveTab('privacy');");
